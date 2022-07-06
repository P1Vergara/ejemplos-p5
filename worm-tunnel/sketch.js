// perlin noise
let xOffset = 0,
    yOffset = 0,
    offsetIncrement = 0.0009,
    perlinIncrement = 0.1;
// anillos
let startSize = 400,
    xStartingPosition = 0,
    yPositionOffset = 0,
    xPositionIncrement = 0.5;
// color
let colorLerpValue = 0,
    colorIncrement = 0.0003,
    color1,
    color2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#6a4c93");

    color1 = color("#ff595e");
    color2 = color("#ffca3a");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // cambiar la posicion a medida del offset
    translate(
        xStartingPosition - startSize,
        map(noise(yPositionOffset), 0, 1, 0 + height / 4, height - height / 4)
    );

    // dibujar hasta llegar al final de la pantalla
    if (xStartingPosition < width + startSize * 2) {
        // anillos perlin
        for (let aTimes = 0; aTimes < 10; aTimes++) {
            ringPoints = 2 * PI * startSize;
            ringPoints = min(ringPoints, 100);

            let currentColor = lerpColor(color2, color1, colorLerpValue);
            noFill();
            strokeWeight(0.1);
            stroke(currentColor, 128);
            colorLerpValue += colorIncrement;

            beginShape();
            for (let i = 0; i < ringPoints; i++) {
                let a = (i / ringPoints) * TAU;
                let p = p5.Vector.fromAngle((i / ringPoints) * TAU);
                let n =
                    noise(
                        xOffset + p.x * perlinIncrement,
                        yOffset + p.y * perlinIncrement
                    ) * startSize;
                p.mult(n);
                vertex(p.x, p.y);
            }
            endShape(CLOSE);

            // incrementar el perlin offset
            xOffset += offsetIncrement;
            yOffset += offsetIncrement;

            // incrementar posicion
            xStartingPosition += xPositionIncrement;
            yPositionOffset += offsetIncrement;
        }
    }
}
