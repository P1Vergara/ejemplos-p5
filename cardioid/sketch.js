let total = 40;
let angle = 0.0;
let radius;
let factor = 0.0;
let started = false;

function setup() {
    createCanvas(640, 640);
    radius = width / 2 - 16;
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    stroke("#ff595e");
    noFill();

    if (started) {
        factor += 0.009;
    }

    ellipse(0, 0, radius * 2);

    for (let i = 0; i < total; i++) {
        let v = getVector(i);
    }

    for (let i = 0; i < total; i++) {
        let a = getVector(i);
        let b = getVector(i * factor);
        line(a.x, a.y, b.x, b.y);
    }
}

function getVector(index) {
    let angle = map(index % total, 0, total, 0, TWO_PI);
    let v = p5.Vector.fromAngle(angle + PI);

    v.mult(radius);

    return v;
}

function mouseClicked() {
    started = !started;
}
