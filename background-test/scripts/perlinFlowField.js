let inc = 0.1; // incremental para perlin noise
let scale = 40; // escala de grilla para columnas y filas
let columns, rows;
let particles = [];
let flowFields;
let zOff = 0; // valor para tercera dimension de noise

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    // setup columns y rows
    columns = floor(width / scale);
    rows = floor(height / scale);

    // inicializar flow fields array
    flowFields = new Array(columns * rows);

    // inicializar particles array
    for (let i = 0; i < 500; i++) {
        particles[i] = new Particle();
    }

    background(255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // correr perlin noise durante una cierta cantidad de tiempo
    if (zOff < 100) {
        perlinNoiseFlow();
    }
}

function perlinNoiseFlow() {
    // inicializar el eje y offset
    let yOff = 0;

    for (let y = 0; y < rows; y++) {
        // inicializar el eje x offset
        let xOff = 0;

        for (let x = 0; x < columns; x++) {
            // conseguir un valor index, crear un valor de noise y vector
            // set flowfields index como el vector
            let index = x + y * columns;
            let angle = noise(xOff, yOff, zOff) * TWO_PI;
            let vector = p5.Vector.fromAngle(angle);
            vector.setMag(4.2);
            flowFields[index] = vector;

            xOff += inc;
        }
        yOff += inc;
        zOff += 0.004;

        noiseDetail(8, 0);
    }

    for (i = 0; i < particles.length; i++) {
        particles[i].follow(flowFields);
        particles[i].update();
        particles[i].edges();
        particles[i].show(zOff);
    }
}
