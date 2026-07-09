var campusExtent = [-8239462.687086, 5074389.328180, -8238403.405811, 5075375.893845];
var initialCampusView = [-8239311.687086, 5074540.328180, -8238554.405811, 5075224.893845];

var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
         maxZoom: 28,
         minZoom: 16,
         extent: campusExtent
    })
});

//initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit(initialCampusView, map.getSize());

//full zooms only
map.getView().setProperties({constrainResolution: true});

//change cursor
function pointerOnFeature(evt) {
    if (evt.dragging) {
        return;
    }
    var hasFeature = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function(layer) {
            return layer && (layer.get("interactive"));
        }
    });
    map.getViewport().style.cursor = hasFeature ? "pointer" : "";
}
map.on('pointermove', pointerOnFeature);
function styleCursorMove() {
    map.on('pointerdrag', function() {
        map.getViewport().style.cursor = "move";
    });
    map.on('pointerup', function() {
        map.getViewport().style.cursor = "default";
    });
}
styleCursorMove();

////small screen definition
    var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
    var isSmallScreen = window.innerWidth < 650;

////controls container

    //top left container
    var topLeftContainer = new ol.control.Control({
        element: (() => {
            var topLeftContainer = document.createElement('div');
            topLeftContainer.id = 'top-left-container';
            return topLeftContainer;
        })(),
    });
    map.addControl(topLeftContainer)

    //bottom left container
    var bottomLeftContainer = new ol.control.Control({
        element: (() => {
            var bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.id = 'bottom-left-container';
            return bottomLeftContainer;
        })(),
    });
    map.addControl(bottomLeftContainer)
  
    //top right container
    var topRightContainer = new ol.control.Control({
        element: (() => {
            var topRightContainer = document.createElement('div');
            topRightContainer.id = 'top-right-container';
            return topRightContainer;
        })(),
    });
    map.addControl(topRightContainer)

    //bottom right container
    var bottomRightContainer = new ol.control.Control({
        element: (() => {
            var bottomRightContainer = document.createElement('div');
            bottomRightContainer.id = 'bottom-right-container';
            return bottomRightContainer;
        })(),
    });
    map.addControl(bottomRightContainer)

//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function(media) {
        media.pause();
        media.currentTime = 0;
    });
}
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    stopMediaInPopup();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container,
	autoPan: true
});
map.addOverlay(overlayPopup)
    
    
var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = false;
var doHover = false;

function cleanPopupValue(value) {
    if (value === null || typeof value === 'undefined') {
        return '';
    }
    return formatPopupValue(value);
}

function titleCase(value) {
    return value.replace(/\b([a-z])([a-z]*)/g, function(match, first, rest) {
        return first.toUpperCase() + rest.toLowerCase();
    });
}

function formatPopupValue(value) {
    if (value === null || typeof value === 'undefined') {
        return '';
    }

    var text = value.toLocaleString().trim();
    if (!text) {
        return '';
    }

    var exactFixes = {
        'both': 'Entrance and Exit',
        'entrance': 'Entrance',
        'exit': 'Exit',
        'entrance and exit': 'Entrance and Exit',
        'teaching building': 'Teaching Building',
        'dorm': 'Dorm',
        'dinning hall': 'Dining Hall',
        'dempsy': 'Dempsey',
        'dyar': 'Dyer',
        'high mount': 'Highmount',
        'highmount': 'Highmount',
        'mcconell': 'McConnell',
        'modular mod': 'Modular Mod',
        'business office': 'Business Office',
        'art center': 'Art Center',
        'admissions': 'Admissions',
        'gym': 'Gym',
        'theatre': 'Theater',
        'theater': 'Theater',
        'cottage': 'Cottage',
        'spyrock': 'Spy Rock',
        'psy ho logy club': 'Psychology Club',
        'psycology club': 'Psychology Club',
        'psychology club': 'Psychology Club',
        'tea club': 'Tea Club',
        '3d printing club': '3D Printing Club',
        'station': 'Station',
        'tbd': 'Not Scheduled Yet',
        'not scheduled yet': 'Not Scheduled Yet',
        'no wheelchair accessible': 'Not wheelchair accessible',
        'no': 'No',
        'yes': 'Yes'
    };

    var lower = text.toLowerCase();
    if (exactFixes[lower]) {
        return exactFixes[lower];
    }

    text = text.replace(/dinning hall/gi, 'Dining Hall');
    text = text.replace(/dempsy/gi, 'Dempsey');
    text = text.replace(/dyar/gi, 'Dyer');
    text = text.replace(/mcconell/gi, 'McConnell');
    text = text.replace(/southwest entance/gi, 'Southwest Entrance');
    text = text.replace(/westsouth/gi, 'west-south');
    text = text.replace(/psycology/gi, 'Psychology');

    if (/^[a-z0-9 ]+$/.test(text) && text.length < 60) {
        return titleCase(text);
    }

    return text;
}

function shouldSkipPopupField(currentFeature, layer, fieldName) {
    var layerTitle = cleanPopupValue(layer.get('popuplayertitle')).toLowerCase();
    var title = getFriendlyPopupTitle(currentFeature, layer).toLowerCase();
    var value = cleanPopupValue(currentFeature.get(fieldName)).toLowerCase();

    if (!value) {
        return true;
    }

    if ((layerTitle === 'entrances_exit' || layerTitle === 'entrances and exits') && (fieldName === 'name' || fieldName === 'building')) {
        return true;
    }

    if (layerTitle === 'buildings' && fieldName === 'build') {
        return true;
    }

    if (layerTitle === 'dorm buildings' && fieldName === 'houses') {
        return true;
    }

    if (layerTitle === 'facilities' && (fieldName === 'name' || fieldName === 'build name') && title.indexOf(value) !== -1) {
        return true;
    }

    if ((layerTitle === 'clublocationweek1' || layerTitle === 'club location week 1' || layerTitle === 'club meetings') && (fieldName === 'Clubname' || fieldName === 'club') && title.indexOf(value) !== -1) {
        return true;
    }

    return false;
}

function getFriendlyPopupTitle(feature, layer) {
    var layerTitle = cleanPopupValue(layer.get('popuplayertitle')).toLowerCase();
    var building = cleanPopupValue(feature.get('building') || feature.get('build') || feature.get('buildname') || feature.get('build name'));
    var name = cleanPopupValue(feature.get('name') || feature.get('Clubname') || feature.get('club') || feature.get('houses'));
    var type = cleanPopupValue(feature.get('type') || feature.get('build type'));

    if (layerTitle === 'entrances_exit' || layerTitle === 'entrances and exits') {
        if (building && name) {
            return building + ' ' + name;
        }
        return name || building || 'Entrance / Exit';
    }

    if (layerTitle === 'buildings') {
        return building || 'Building';
    }

    if (layerTitle === 'dorm buildings') {
        return name || building || 'Dorm Building';
    }

    if (layerTitle === 'facilities') {
        return name || building || 'Facility';
    }

    if (layerTitle === 'faculty houses') {
        return name ? 'Faculty House ' + name : 'Faculty House';
    }

    if (layerTitle === 'clublocationweek1' || layerTitle === 'club location week 1' || layerTitle === 'club meetings') {
        return name || 'Club Meeting';
    }

    if (layerTitle === 'mobility') {
        return type || 'Pathway';
    }

    if (layerTitle === 'campus area') {
        return 'Campus Area';
    }

    return layerTitle || 'Map Feature';
}

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        if (currentFeatureKeys[i] != 'geometry' && currentFeatureKeys[i] != 'layerObject' && currentFeatureKeys[i] != 'idO') {
            var popupField = '';
            var fieldValue = currentFeature.get(currentFeatureKeys[i]);
            var displayValue = formatPopupValue(fieldValue);
            if (shouldSkipPopupField(currentFeature, layer, currentFeatureKeys[i])) {
                continue;
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "hidden field") {
                continue;
            } else if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                if (!displayValue) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</th><td>';
            } else {
                popupField += '<td colspan="2">';
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                if (!displayValue) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</strong><br />';
            }
            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
				popupField += (displayValue ? autolinker.link(displayValue) + '</td>' : '');
			} else {
				if (/\.(gif|jpg|jpeg|tif|tiff|png|avif|webp|svg)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<img src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" /></td>' : '');
				} else if (/\.(mp4|webm|ogg|avi|mov|flv)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<video controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="video/mp4">Il tuo browser non supporta il tag video.</video></td>' : '');
				} else if (/\.(mp3|wav|ogg|aac|flac)$/i.test(fieldValue)) {
                    popupField += (fieldValue != null ? '<audio controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="audio/mpeg">Il tuo browser non supporta il tag audio.</audio></td>' : '');
                } else {
					popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
				}
			}
            popupText += '<tr>' + popupField + '</tr>';
        }
    }
    return popupText;
}

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function onPointerMove(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLength;
    var popupText = '<ul>';

    // Collect all features and their layers at the pixel
    var featuresAndLayers = [];
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            featuresAndLayers.push({ feature, layer });
        }
    });

    // Iterate over the features and layers in reverse order
    for (var i = featuresAndLayers.length - 1; i >= 0; i--) {
        var feature = featuresAndLayers[i].feature;
        var layer = featuresAndLayers[i].layer;
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get("features");
        if (clusteredFeatures) {
            clusterLength = clusteredFeatures.length;
        }
        if (typeof clusteredFeatures !== "undefined") {
            if (doPopup) {
                for(var n=0; n<clusteredFeatures.length; n++) {
                    currentFeature = clusteredFeatures[n];
                    currentFeatureKeys = currentFeature.getKeys();
                    popupText += '<li><table>'
                    popupText += '<a>' + '<b>' + getFriendlyPopupTitle(currentFeature, layer) + '</b>' + '</a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';    
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                popupText += '<a>' + '<b>' + getFriendlyPopupTitle(currentFeature, layer) + '</b>' + '</a>';
                popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                popupText += '</table></li>';
            }
        }
    }

    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
	if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var featureStyle
                if (typeof clusteredFeatures == "undefined") {
					var style = currentLayer.getStyle();
					var styleFunction = typeof style === 'function' ? style : function() { return style; };
					featureStyle = styleFunction(currentFeature)[0];
				} else {
					featureStyle = currentLayer.getStyle().toString();
				}

                if (currentFeature.getGeometry().getType() == 'Point' || currentFeature.getGeometry().getType() == 'MultiPoint') {
                    var radius
					if (typeof clusteredFeatures == "undefined") {
						radius = featureStyle.getImage().getRadius();
					} else {
						radius = parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLength;
					}

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "rgba(255, 255, 0, 1.00)"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString' || currentFeature.getGeometry().getType() == 'MultiLineString') {

                    var featureWidth = featureStyle.getStroke().getWidth();

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 255, 0, 1.00)',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 0, 1.00)'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
			content.innerHTML = popupText;
            container.style.display = 'block';
            overlayPopup.setPosition(coord);
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

map.on('pointermove', onPointerMove);

var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    if (popupContent) {
        content.innerHTML = popupContent;
        container.style.display = 'block';
		overlayPopup.setPosition(popupCoord);
    } else {
        container.style.display = 'none';
        closer.blur();
        stopMediaInPopup();
    }
} 

function onSingleClickFeatures(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        featuresPopupActive = true;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            var doPopup = false;
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n = 0; n < clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>';
                        popupText += '<a><b>' + getFriendlyPopupTitle(currentFeature, layer) + '</b></a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
                    popupText += '<a><b>' + getFriendlyPopupTitle(currentFeature, layer) + '</b></a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table>';
                }
            }
        }
    });
    if (popupText === '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
	
	popupContent = popupText;
    popupCoord = coord;
    updatePopup();
}

function onSingleClickWMS(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        popupContent = '';
    }
    var coord = evt.coordinate;
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();

    for (var i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection, {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                const wmsTitle = wms_layers[i][0].get('popuplayertitle');
                var ldsRoller = '<div class="roller-switcher" style="height: 25px; width: 25px;"></div>';

                popupCoord = coord;
                popupContent += ldsRoller;
                updatePopup();

                var timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout exceeded'));
                    }, 5000); // (5 second)
                });

                // Function to try fetch with different option
                function tryFetch(urls) {
                    if (urls.length === 0) {
                        return Promise.reject(new Error('All fetch attempts failed'));
                    }
                    return fetch(urls[0])
                        .then((response) => {
                            if (response.ok) {
                                return response.text();
                            } else {
                                throw new Error('Fetch failed');
                            }
                        })
                        .catch(() => tryFetch(urls.slice(1))); // Try next URL
                }

                // List of URLs to try
                // The first URL is the original, the second is the encoded version, and the third is the proxy
                const urlsToTry = [
                    url,
                    encodeURIComponent(url),
                    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)
                ];

                Promise.race([tryFetch(urlsToTry), timeoutPromise])
                    .then((html) => {
                        if (html.indexOf('<table') !== -1) {
                            popupContent += '<a><b>' + wmsTitle + '</b></a>';
                            popupContent += html + '<p></p>';
                            updatePopup();
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            var loaderIcon = document.querySelector('.roller-switcher');
                            if (loaderIcon) loaderIcon.remove();
                        }, 500); // (0.5 second)
                    });
            }
        }
    }
}

map.on('singleclick', onSingleClickFeatures);
map.on('singleclick', onSingleClickWMS);

function showCoordinateCopyMessage(text) {
  var message = document.getElementById('coordinate-copy-message');
  if (!message) {
    message = document.createElement('div');
    message.id = 'coordinate-copy-message';
    message.style.position = 'fixed';
    message.style.left = '50%';
    message.style.bottom = '20px';
    message.style.transform = 'translateX(-50%)';
    message.style.zIndex = '9999';
    message.style.maxWidth = 'min(560px, calc(100vw - 32px))';
    message.style.padding = '10px 14px';
    message.style.borderRadius = '6px';
    message.style.background = '#1f2937';
    message.style.color = '#ffffff';
    message.style.font = '14px/1.4 Arial, sans-serif';
    message.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
    message.style.wordBreak = 'break-word';
    document.body.appendChild(message);
  }
  message.textContent = text;
  clearTimeout(message.hideTimer);
  message.hideTimer = setTimeout(function() {
    message.remove();
  }, 7000);
}

map.on('singleclick', function(evt) {
  if (!evt.originalEvent || !evt.originalEvent.shiftKey) {
    return;
  }

  var lonLat = ol.proj.toLonLat(evt.coordinate);
  var coordinateText = '[' + lonLat[0].toFixed(15) + ', ' + lonLat[1].toFixed(15) + ']';
  var messageText = 'Club meeting coordinates copied: ' + coordinateText;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(coordinateText).then(function() {
      showCoordinateCopyMessage(messageText);
    }).catch(function() {
      showCoordinateCopyMessage('Club meeting coordinates: ' + coordinateText);
    });
  } else {
    showCoordinateCopyMessage('Club meeting coordinates: ' + coordinateText);
  }
});

//get container
var topLeftContainerDiv = document.getElementById('top-left-container')
var bottomLeftContainerDiv = document.getElementById('bottom-left-container')
var topRightContainerDiv = document.getElementById('top-right-container')
var bottomRightContainerDiv = document.getElementById('bottom-right-container')

//title

//abstract


//geolocate



//measurement





//geocoder


//layer search


//scalebar


//layerswitcher






//attribution
var bottomAttribution = new ol.control.Attribution({
  collapsible: false,
  collapsed: false,
  className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

map.once('rendercomplete', function() {
  var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
  if (bottomAttributionUl) {
    var layerAttrs = Array.from(bottomAttributionUl.querySelectorAll('li'))
      .map(function(li) { return li.innerHTML.trim(); }).filter(Boolean);
    var attribHtml = `
    <a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot;
    <a href="https://openlayers.org/">OpenLayers</a> &middot;
    <a href="https://qgis.org/">QGIS</a>`;
    if (layerAttrs.length > 0) { attribHtml += ' &nbsp;|&nbsp; ' + layerAttrs.join(', '); }
    bottomAttributionUl.innerHTML = '<li>' + attribHtml + '</li>';
  }
});


// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
var isPopupAllActive = false;
document.addEventListener('DOMContentLoaded', function() {
	if (doHover || doHighlight) {
		var controlElements = document.getElementsByClassName('ol-control');
		for (var i = 0; i < controlElements.length; i++) {
			controlElements[i].addEventListener('mouseover', function() { 
				doHover = false;
				doHighlight = false;
			});
			controlElements[i].addEventListener('mouseout', function() {
				doHover = preDoHover;
				if (isPopupAllActive) { return }
				doHighlight = preDoHighlight;
			});
		}
	}
});


//move controls inside containers, in order
    //zoom
    var zoomControl = document.getElementsByClassName('ol-zoom')[0];
    if (zoomControl) {
        topLeftContainerDiv.appendChild(zoomControl);
    }
    //geolocate
    if (typeof geolocateControl !== 'undefined') {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
    //measure
    if (typeof measureControl !== 'undefined') {
        topLeftContainerDiv.appendChild(measureControl);
    }
    //geocoder
    var searchbar = document.getElementsByClassName('photon-geocoder-autocomplete ol-unselectable ol-control')[0];
    if (searchbar) {
        topLeftContainerDiv.appendChild(searchbar);
    }
    //search layer
    var searchLayerControl = document.getElementsByClassName('search-layer')[0];
    if (searchLayerControl) {
        topLeftContainerDiv.appendChild(searchLayerControl);
    }
    //scale line
    var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
    if (scaleLineControl) {
        scaleLineControl.className += ' ol-control';
        bottomLeftContainerDiv.appendChild(scaleLineControl);
    }
    //attribution
    var attributionControl = document.getElementsByClassName('bottom-attribution')[0];
    if (attributionControl) {
        bottomRightContainerDiv.appendChild(attributionControl);
    }
