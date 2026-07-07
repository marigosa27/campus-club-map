var createTextStyle = function(feature, resolution, labelText, labelFont,
                               labelFill, placement, bufferColor,
                               bufferWidth) {

    if (feature.hide || !labelText) {
        return; 
    } 

    labelText = formatMapLabel(labelText);

    if (bufferWidth == 0) {
        var bufferStyle = null;
    } else {
        var bufferStyle = new ol.style.Stroke({
            color: bufferColor,
            width: bufferWidth
        })
    }
    
    var textStyle = new ol.style.Text({
        font: labelFont,
        text: labelText,
        textBaseline: "middle",
        textAlign: "left",
        offsetX: 8,
        offsetY: 3,
        placement: placement,
        maxAngle: 0,
        fill: new ol.style.Fill({
          color: labelFill
        }),
        stroke: bufferStyle
    });

    return textStyle;
};

function titleCaseMapLabel(value) {
    return value.replace(/\b([a-z])([a-z]*)/g, function(match, first, rest) {
        return first.toUpperCase() + rest.toLowerCase();
    });
}

function formatMapLabel(value) {
    if (value === null || typeof value === 'undefined') {
        return '';
    }

    var text = value.toLocaleString().trim();
    if (!text) {
        return '';
    }

    var exactFixes = {
        'dinning hall': 'Dining Hall',
        'dempsy': 'Dempsey',
        'dyar': 'Dyer',
        'high mount': 'Highmount',
        'highmount': 'Highmount',
        'mcconell': 'McConnell',
        'business office': 'Business Office',
        'art center': 'Art Center',
        'admissions': 'Admissions',
        'gym': 'Gym',
        'theatre': 'Theater',
        'theater': 'Theater',
        'cottage': 'Cottage',
        'spyrock': 'Spy Rock',
        '3d printing club': '3D Printing Club',
        'tea club': 'Tea Club',
        'psycology club': 'Psychology Club'
    };

    var lower = text.toLowerCase();
    if (exactFixes[lower]) {
        return exactFixes[lower];
    }

    text = text.replace(/dinning hall/gi, 'Dining Hall');
    text = text.replace(/dempsy/gi, 'Dempsey');
    text = text.replace(/dyar/gi, 'Dyer');
    text = text.replace(/mcconell/gi, 'McConnell');
    text = text.replace(/psycology/gi, 'Psychology');

    if (/^[a-z0-9 ]+$/.test(text) && text.length < 60) {
        return titleCaseMapLabel(text);
    }

    return text;
}

function stripe(stripeWidth, gapWidth, angle, color) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = screen.width;
    canvas.height = stripeWidth + gapWidth;
    context.fillStyle = color;
    context.lineWidth = stripeWidth;
    context.fillRect(0, 0, canvas.width, stripeWidth);
    innerPattern = context.createPattern(canvas, 'repeat');

    var outerCanvas = document.createElement('canvas');
    var outerContext = outerCanvas.getContext('2d');
    outerCanvas.width = screen.width;
    outerCanvas.height = screen.height;
    outerContext.rotate((Math.PI / 180) * angle);
    outerContext.translate(-(screen.width/2), -(screen.height/2));
    outerContext.fillStyle = innerPattern;
    outerContext.fillRect(0,0,screen.width,screen.height);

    return outerContext.createPattern(outerCanvas, 'no-repeat');
};
