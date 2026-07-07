(function () {
  if (typeof ol === "undefined" || typeof map === "undefined") {
    console.warn("Geolocation could not start because the OpenLayers map was not found.");
    return;
  }

  var locationSource = new ol.source.Vector();
  var locationLayer = new ol.layer.Vector({
    source: locationSource,
    zIndex: 9999,
    style: function (feature) {
      if (feature.get("accuracy")) {
        return new ol.style.Style({
          fill: new ol.style.Fill({ color: "rgba(37, 99, 235, 0.14)" }),
          stroke: new ol.style.Stroke({ color: "rgba(37, 99, 235, 0.45)", width: 2 })
        });
      }

      return [
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 9,
            fill: new ol.style.Fill({ color: "#2563eb" }),
            stroke: new ol.style.Stroke({ color: "#ffffff", width: 3 })
          })
        }),
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 20,
            fill: new ol.style.Fill({ color: "rgba(37, 99, 235, 0.18)" })
          })
        })
      ];
    }
  });

  map.addLayer(locationLayer);

  var button = document.createElement("button");
  button.type = "button";
  button.className = "geolocate-user-button";
  button.title = "Show my location";
  button.setAttribute("aria-label", "Show my location");
  button.textContent = "◎";

  var element = document.createElement("div");
  element.className = "geolocate-user ol-unselectable ol-control";
  element.appendChild(button);

  map.addControl(new ol.control.Control({ element: element }));

  var watchId = null;
  var manualPanel = null;

  function setButtonState(active) {
    button.classList.toggle("is-active", active);
    button.title = active ? "Stop following my location" : "Show my location";
    button.setAttribute("aria-label", button.title);
  }

  function drawLocation(lonLat, accuracy) {
    var point = ol.proj.fromLonLat(lonLat);
    var features = [new ol.Feature(new ol.geom.Point(point))];

    if (accuracy) {
      var accuracyGeometry = ol.geom.Polygon.circular(lonLat, accuracy).transform("EPSG:4326", "EPSG:3857");
      var accuracyFeature = new ol.Feature(accuracyGeometry);
      accuracyFeature.set("accuracy", true);
      features.unshift(accuracyFeature);
    }

    locationSource.clear();
    locationSource.addFeatures(features);

    map.getView().animate({
      center: point,
      zoom: Math.max(map.getView().getZoom() || 0, 18),
      duration: 450
    });
  }

  function showPosition(position) {
    drawLocation([position.coords.longitude, position.coords.latitude], position.coords.accuracy);
  }

  function closeManualPanel() {
    if (!manualPanel) {
      return;
    }
    manualPanel.remove();
    manualPanel = null;
  }

  function offerManualLocation(message) {
    setButtonState(false);
    closeManualPanel();

    manualPanel = document.createElement("form");
    manualPanel.className = "manual-location-panel";
    manualPanel.innerHTML =
      '<strong>Location unavailable</strong>' +
      '<p>' + message + '</p>' +
      '<label>Latitude <input name="lat" inputmode="decimal" placeholder="42.7018"></label>' +
      '<label>Longitude <input name="lon" inputmode="decimal" placeholder="-73.1087"></label>' +
      '<div class="manual-location-actions">' +
      '<button type="submit">Go</button>' +
      '<button type="button" data-close="true">Cancel</button>' +
      '</div>';

    manualPanel.querySelector('[data-close="true"]').addEventListener("click", closeManualPanel);
    manualPanel.addEventListener("submit", function (event) {
      event.preventDefault();

      var lat = Number(manualPanel.elements.lat.value.trim());
      var lon = Number(manualPanel.elements.lon.value.trim());

      if (!isFinite(lat) || !isFinite(lon)) {
        manualPanel.querySelector("p").textContent = "Please enter coordinates like 42.7018 and -73.1087.";
        return;
      }

      closeManualPanel();
      drawLocation([lon, lat], 50);
    });

    var mapElement = map.getTargetElement();
    if (!mapElement) {
      return;
    }
    mapElement.appendChild(manualPanel);
  }

  function clearWatch() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }

  function startWatch() {
    clearWatch();
    watchId = navigator.geolocation.watchPosition(showPosition, function () {
      clearWatch();
      setButtonState(false);
    }, {
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: 60000
    });
  }

  function tryApproximateLocation(firstError) {
    navigator.geolocation.getCurrentPosition(function (position) {
      showPosition(position);
      startWatch();
    }, function (error) {
      var reason = error && error.message ? error.message : firstError.message;
      offerManualLocation("Could not get your location: " + reason);
    }, {
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: 300000
    });
  }

  button.addEventListener("click", function () {
    if (!navigator.geolocation) {
      offerManualLocation("Geolocation is not supported by this browser.");
      return;
    }

    if (watchId !== null) {
      clearWatch();
      setButtonState(false);
      return;
    }

    setButtonState(true);

    navigator.geolocation.getCurrentPosition(function (position) {
      showPosition(position);
      startWatch();
    }, function (error) {
      if (error.code === error.PERMISSION_DENIED) {
        offerManualLocation("Location permission was denied.");
        return;
      }

      tryApproximateLocation(error);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 10000
    });
  });
})();
