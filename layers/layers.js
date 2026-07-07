var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_mobility_1 = new ol.format.GeoJSON();
var features_mobility_1 = format_mobility_1.readFeatures(json_mobility_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mobility_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mobility_1.addFeatures(features_mobility_1);
var lyr_mobility_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_mobility_1, 
                style: style_mobility_1,
                popuplayertitle: 'Mobility',
                interactive: true,
    title: 'Mobility<br />\
    <img src="styles/legend/mobility_1_0.png" /> Road<br />\
    <img src="styles/legend/mobility_1_1.png" /> Sidewalk<br />' });
var format_buildings_2 = new ol.format.GeoJSON();
var features_buildings_2 = format_buildings_2.readFeatures(json_buildings_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_buildings_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_buildings_2.addFeatures(features_buildings_2);
var lyr_buildings_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_buildings_2, 
                style: style_buildings_2,
                popuplayertitle: 'Buildings',
                interactive: true,
                title: '<img src="styles/legend/buildings_2.png" /> Buildings'
            });
var format_dormbuildings_3 = new ol.format.GeoJSON();
var features_dormbuildings_3 = format_dormbuildings_3.readFeatures(json_dormbuildings_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_dormbuildings_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_dormbuildings_3.addFeatures(features_dormbuildings_3);
var lyr_dormbuildings_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_dormbuildings_3, 
                style: style_dormbuildings_3,
                popuplayertitle: 'Dorm Buildings',
                interactive: true,
    title: 'Dorm Buildings<br />\
    <img src="styles/legend/dormbuildings_3_0.png" /> <br />\
    <img src="styles/legend/dormbuildings_3_1.png" /> Cottage<br />\
    <img src="styles/legend/dormbuildings_3_2.png" /> Dempsey<br />\
    <img src="styles/legend/dormbuildings_3_3.png" /> Highmount<br />\
    <img src="styles/legend/dormbuildings_3_4.png" /> McConnell<br />\
    <img src="styles/legend/dormbuildings_3_5.png" /> Spy Rock<br />\
    <img src="styles/legend/dormbuildings_3_6.png" /> Stone<br />' });
var format_entrances_exit_4 = new ol.format.GeoJSON();
var features_entrances_exit_4 = format_entrances_exit_4.readFeatures(json_entrances_exit_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_entrances_exit_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_entrances_exit_4.addFeatures(features_entrances_exit_4);
var lyr_entrances_exit_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_entrances_exit_4, 
                style: style_entrances_exit_4,
                popuplayertitle: 'Entrances and Exits',
                interactive: true,
                title: '<img src="styles/legend/entrances_exit_4.png" /> Entrances and Exits'
            });
var format_facilities_5 = new ol.format.GeoJSON();
var features_facilities_5 = format_facilities_5.readFeatures(json_facilities_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_facilities_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_facilities_5.addFeatures(features_facilities_5);
var lyr_facilities_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_facilities_5, 
                style: style_facilities_5,
                popuplayertitle: 'Facilities',
                interactive: true,
                title: '<img src="styles/legend/facilities_5.png" /> Facilities'
            });
var format_facultyhouses_6 = new ol.format.GeoJSON();
var features_facultyhouses_6 = format_facultyhouses_6.readFeatures(json_facultyhouses_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_facultyhouses_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_facultyhouses_6.addFeatures(features_facultyhouses_6);
var lyr_facultyhouses_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_facultyhouses_6, 
                style: style_facultyhouses_6,
                popuplayertitle: 'Faculty Houses',
                interactive: true,
                title: '<img src="styles/legend/facultyhouses_6.png" /> Faculty Houses'
            });
var format_clublocationweek1_7 = new ol.format.GeoJSON();
var features_clublocationweek1_7 = format_clublocationweek1_7.readFeatures(json_clublocationweek1_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_clublocationweek1_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_clublocationweek1_7.addFeatures(features_clublocationweek1_7);
var lyr_clublocationweek1_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_clublocationweek1_7, 
                style: style_clublocationweek1_7,
                popuplayertitle: 'Club Location Week 1',
                interactive: true,
                title: '<img src="styles/legend/clublocationweek1_7.png" /> Club Location Week 1'
            });
var format_campusarea_8 = new ol.format.GeoJSON();
var features_campusarea_8 = format_campusarea_8.readFeatures(json_campusarea_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_campusarea_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_campusarea_8.addFeatures(features_campusarea_8);
var lyr_campusarea_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_campusarea_8, 
                style: style_campusarea_8,
                popuplayertitle: 'Campus Area',
                interactive: true,
                title: '<img src="styles/legend/campusarea_8.png" /> Campus Area'
            });
var format_clubmeetings_9 = new ol.format.GeoJSON();
var features_clubmeetings_9 = format_clubmeetings_9.readFeatures(json_clubmeetings_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_clubmeetings_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_clubmeetings_9.addFeatures(features_clubmeetings_9);
var lyr_clubmeetings_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_clubmeetings_9, 
                style: style_clubmeetings_9,
                popuplayertitle: 'Club Meetings',
                interactive: true,
                title: '<img src="styles/legend/clubmeetings_9.png" /> Club Meetings'
            });

lyr_OSMStandard_0.setVisible(true);lyr_mobility_1.setVisible(true);lyr_buildings_2.setVisible(true);lyr_dormbuildings_3.setVisible(true);lyr_entrances_exit_4.setVisible(true);lyr_facilities_5.setVisible(true);lyr_facultyhouses_6.setVisible(true);lyr_clublocationweek1_7.setVisible(true);lyr_campusarea_8.setVisible(true);lyr_clubmeetings_9.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_mobility_1,lyr_buildings_2,lyr_dormbuildings_3,lyr_entrances_exit_4,lyr_facilities_5,lyr_facultyhouses_6,lyr_clublocationweek1_7,lyr_campusarea_8,lyr_clubmeetings_9];
lyr_mobility_1.set('fieldAliases', {'id': 'ID', 'type': 'Type', });
lyr_buildings_2.set('fieldAliases', {'id': 'ID', 'build': 'Building', 'build type': 'Type', });
lyr_dormbuildings_3.set('fieldAliases', {'id': 'ID', 'houses': 'Residence', 'build type': 'Type', });
lyr_entrances_exit_4.set('fieldAliases', {'id': 'ID', 'name': 'Name', 'building': 'Building', 'type': 'Type', 'accessibi': 'Accessibility', 'hours': 'Hours', 'notes': 'Notes', });
lyr_facilities_5.set('fieldAliases', {'id': 'ID', 'name': 'Name', 'build name': 'Building', 'build type': 'Type', });
lyr_facultyhouses_6.set('fieldAliases', {'id': 'ID', 'house numb': 'House Number', 'build type': 'Type', });
lyr_clublocationweek1_7.set('fieldAliases', {'id': 'ID', 'Clubname': 'Club', 'build area': 'Building Area', 'time': 'Time', 'president': 'President', 'advisor': 'Advisor', 'direction': 'Directions', 'informatio': 'Information', });
lyr_campusarea_8.set('fieldAliases', {'id': 'ID', });
lyr_clubmeetings_9.set('fieldAliases', {'id': 'ID', 'club': 'Club', 'buildname': 'Building', 'date': 'Date', 'time': 'Time', 'classroom': 'Classroom', 'info': 'Information', });
lyr_mobility_1.set('fieldImages', {'id': 'TextEdit', 'type': 'TextEdit', });
lyr_buildings_2.set('fieldImages', {'id': 'TextEdit', 'build': 'TextEdit', 'build type': 'TextEdit', });
lyr_dormbuildings_3.set('fieldImages', {'id': 'TextEdit', 'houses': 'TextEdit', 'build type': 'TextEdit', });
lyr_entrances_exit_4.set('fieldImages', {'id': 'TextEdit', 'name': 'TextEdit', 'building': 'TextEdit', 'type': 'TextEdit', 'accessibi': 'TextEdit', 'hours': 'TextEdit', 'notes': 'TextEdit', });
lyr_facilities_5.set('fieldImages', {'id': 'TextEdit', 'name': 'TextEdit', 'build name': 'TextEdit', 'build type': 'TextEdit', });
lyr_facultyhouses_6.set('fieldImages', {'id': 'TextEdit', 'house numb': 'TextEdit', 'build type': 'TextEdit', });
lyr_clublocationweek1_7.set('fieldImages', {'id': '', 'Clubname': '', 'build area': '', 'time': '', 'president': '', 'advisor': '', 'direction': '', 'informatio': '', });
lyr_campusarea_8.set('fieldImages', {'id': 'TextEdit', });
lyr_clubmeetings_9.set('fieldImages', {'id': 'TextEdit', 'club': 'TextEdit', 'buildname': 'TextEdit', 'date': 'DateTime', 'time': 'TextEdit', 'classroom': 'TextEdit', 'info': 'TextEdit', });
lyr_mobility_1.set('fieldLabels', {'id': 'hidden field', 'type': 'inline label - visible with data', });
lyr_buildings_2.set('fieldLabels', {'id': 'hidden field', 'build': 'inline label - visible with data', 'build type': 'inline label - visible with data', });
lyr_dormbuildings_3.set('fieldLabels', {'id': 'hidden field', 'houses': 'inline label - visible with data', 'build type': 'inline label - visible with data', });
lyr_entrances_exit_4.set('fieldLabels', {'id': 'hidden field', 'name': 'inline label - visible with data', 'building': 'inline label - visible with data', 'type': 'inline label - visible with data', 'accessibi': 'inline label - visible with data', 'hours': 'inline label - visible with data', 'notes': 'inline label - visible with data', });
lyr_facilities_5.set('fieldLabels', {'id': 'hidden field', 'name': 'inline label - visible with data', 'build name': 'inline label - visible with data', 'build type': 'inline label - visible with data', });
lyr_facultyhouses_6.set('fieldLabels', {'id': 'hidden field', 'house numb': 'inline label - visible with data', 'build type': 'inline label - visible with data', });
lyr_clublocationweek1_7.set('fieldLabels', {'id': 'hidden field', 'Clubname': 'inline label - visible with data', 'build area': 'inline label - visible with data', 'time': 'inline label - visible with data', 'president': 'inline label - visible with data', 'advisor': 'inline label - visible with data', 'direction': 'inline label - visible with data', 'informatio': 'inline label - visible with data', });
lyr_campusarea_8.set('fieldLabels', {'id': 'hidden field', });
lyr_clubmeetings_9.set('fieldLabels', {'id': 'hidden field', 'club': 'inline label - visible with data', 'buildname': 'inline label - visible with data', 'date': 'inline label - visible with data', 'time': 'inline label - visible with data', 'classroom': 'inline label - visible with data', 'info': 'inline label - visible with data', });
lyr_clubmeetings_9.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
