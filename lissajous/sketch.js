let w = 120;
let cols;
let rows;
let angle = 0.0;
let curves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // numero de filas y columnas
    cols = width / w - 1;
    rows = height / w - 1;

    for (let i = 0; i < rows; i++) {
        curves[i] = [];

        for (let j = 0; j < cols; j++) {
            curves[i][j] = new Curve();
        }
    }
}

function draw() {
    background("#ffca3a");

    stroke(255);
    noFill();

    let diameter = w - 10;
    let radius = diameter / 2;

    // dibujar osciladores
    oscillator("h", false, diameter, radius);
    oscillator("v", false, diameter, radius);

    // sumar al angulo parar mover el ancla del oscilador
    angle -= 0.01;

    // dibujar curvas
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            curves[j][i].addPoint();
            curves[j][i].show();
        }
    }

    // reiniciar si es que el angulo da la vuelta completa
    if (angle < -TWO_PI) {
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                curves[j][i].reset();
            }
        }

        saveCanvas("lissajous.png");
        angle = 0.0;
        noLoop();
    }
}

function oscillator(direction, lines, d, r) {
    // direccion de los osciladores
    let centerX;
    let centerY;

    if (direction === "h") {
        for (let i = 0; i < cols; i++) {
            // horizontal
            centerX = w + i * w + w / 2;
            centerY = w / 2;

            // dibujar circulos
            stroke(255);
            strokeWeight(1);
            ellipse(centerX, centerY, d, d);

            // dibujar puntos
            let x = r * cos(angle * (i + 1) - HALF_PI);
            let y = r * sin(angle * (i + 1) - HALF_PI);

            stroke(255);
            strokeWeight(8);
            point(centerX + x, centerY + y);

            // dibujar lineas guia
            if (lines) {
                stroke(255, 100);
                strokeWeight(1);

                direction === "h"
                    ? line(centerX + x, centerY + y, centerX + x, height)
                    : line(centerX + x, centerY + y, width, centerY + y);
            }

            for (let j = 0; j < rows; j++) {
                curves[j][i].setX(centerX + x);
            }
        }
    } else {
        for (let j = 0; j < rows; j++) {
            // vertical
            centerX = w / 2;
            centerY = w + j * w + w / 2;

            // dibujar circulos
            stroke(255);
            strokeWeight(1);
            ellipse(centerX, centerY, d, d);

            // dibujar puntos
            let x = r * cos(angle * (j + 1) - HALF_PI);
            let y = r * sin(angle * (j + 1) - HALF_PI);

            stroke(255);
            strokeWeight(8);
            point(centerX + x, centerY + y);

            // dibujar lineas guia
            if (lines) {
                stroke(255, 100);
                strokeWeight(1);

                direction === "h"
                    ? line(centerX + x, centerY + y, centerX + x, height)
                    : line(centerX + x, centerY + y, width, centerY + y);
            }

            for (let i = 0; i < cols; i++) {
                curves[j][i].setY(centerY + y);
            }
        }
    }
}
