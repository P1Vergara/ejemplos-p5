// grilla
let resolution = 16,
    columns,
    rows;
colors = [];
// animacion
let maxDistance,
    animModifier = 0.0,
    modifierIncrement = 0.1,
    offsetSize = -40,
    offsetRate = 200,
    maxGap = -5,
    maxSize = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);

    columns = ceil(windowWidth / resolution);
    rows = ceil(windowHeight / resolution);

    colors = make2DArray(columns, rows);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let c = floor(random(2));
            c === 1 ? (colors[i][j] = "#6a4c93") : (colors[i][j] = "#ffca3a");
        }
    }

    maxDistance = dist(
        windowWidth / 2,
        windowHeight / 2,
        windowWidth,
        windowHeight
    );

    frameRate(30);
    noStroke();

    ellipseMode(CENTER);
}

function make2DArray(c, r) {
    let newArray = new Array(c);

    for (let i = 0; i < newArray.length; i++) {
        newArray[i] = new Array(r);
    }
    return newArray;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    animModifier += modifierIncrement;

    // dibujar circulos
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            push();
            let x = i * resolution,
                y = j * resolution;

            // distancia desde el centro
            let distance = dist(x, y, windowWidth / 2, windowHeight / 2),
                // offset para animacion basado en la distancia
                offset = map(distance, 0, maxDistance, offsetSize, offsetRate),
                sizeMod = map(
                    sin(animModifier + offset),
                    maxGap,
                    maxSize,
                    0,
                    resolution
                );

            fill(colors[i][j]);
            ellipse(x, y, sizeMod, sizeMod);
            pop();
        }
    }
}
