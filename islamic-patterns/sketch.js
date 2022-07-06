// --------------------------------------------------
// paper que explica el metodo
// https://dl.acm.org/doi/pdf/10.5555/1089508.1089538
// --------------------------------------------------

// variables de polygonos
let resolution = 200,
    resolution2 = 100,
    polys = [],
    polys2 = [],
    angle = 75,
    delta = 10;
// variables de slider
let angleSlider,
    deltaSlider,
    topAngle = 90,
    angleUp = true,
    topDelta = 25,
    deltaUp = true;
// color values
let color1,
    color2,
    color3,
    colors = [];
(xAxis = 1), (yAxis = 2);

function setup() {
    createCanvas(1200, 800);

    color1 = color(47, 43, 173);
    color2 = color(173, 43, 173);
    color3 = color(228, 38, 146);

    colors.push(color1, color2, color3);

    angleSlider = createSlider(0, 90, 60);
    deltaSlider = createSlider(0, 25, 0);

    // agregar poligono en base a la resolucion
    for (let x = 0; x < windowWidth; x += resolution) {
        for (let y = 0; y < windowHeight; y += resolution) {
            let poly = new polygon(4);
            poly.addVertex(x, y);
            poly.addVertex(x + resolution, y);
            poly.addVertex(x + resolution, y + resolution);
            poly.addVertex(x, y + resolution);
            poly.close();
            polys.push(poly);
        }
    }

    // agregar otro set de poligonos en base a la resolucion
    for (let x = 0; x < windowWidth; x += resolution2) {
        for (let y = 0; y < windowHeight; y += resolution2) {
            let poly = new polygon(4);
            poly.addVertex(x, y);
            poly.addVertex(x + resolution2, y);
            poly.addVertex(x + resolution2, y + resolution2);
            poly.addVertex(x, y + resolution2);
            poly.close();
            polys2.push(poly);
        }
    }
}

function draw() {
    background("#6a4c93");

    angle = angleSlider.value();
    delta = deltaSlider.value();

    // dibujar poligonos
    for (let i = 0; i < polys.length; i++) {
        polys[i].hankin();
        polys[i].show();
    }
    for (let i = 0; i < polys2.length; i++) {
        polys2[i].hankin();
        polys2[i].show();
    }
}
