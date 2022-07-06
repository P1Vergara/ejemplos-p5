let amount = 3;
let colors = ["#ffca3a", "#6a4c93", "#8ac926"];

function setup() {
    createCanvas(600, 600);
    background("#f5f3f4");
    rectMode(CENTER);

    translate(width / 2, height / 2);

    for (let i = 0; i < amount; i++) {
        let x = random(-width / 4, width / 4),
            y = random(-height / 4, height / 4),
            w = random(100, 400),
            h = random(20, 100);

        drawRectangle(x, y, w, h);
    }
}

function drawRectangle(x, y, w, h) {
    rotate(4);
    noStroke();
    fill(colors[floor(random(colors.length))]);
    rect(x, y, w, h);
}
