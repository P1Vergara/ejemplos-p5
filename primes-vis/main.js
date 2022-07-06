let r;
let counter;
let balls = [];
let primes = [];
let a = 0.0;
let s = 0.0;
let slider;
let theta;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ellipseMode(CENTER);

    slider = createSlider(0, 255, 100, 1);
    slider.position(10, 10);
    slider.style("width", "80px");

    r = 0;
    counter = 0;
    theta = 0;

    for (let i = 0; i < 300000; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    primes.forEach(function () {
        // convertir polar a cartesiano
        let x = r * cos(theta);
        let y = r * sin(theta);

        let b = new Ball(x, y);
        balls.push(b);
        r += 2;
        theta += 2;
    });
}

function draw() {
    background("#ffca3a");

    let val = slider.value();
    let s = map(val, 0, 255, 0.01, 0.9);

    // mover el origen al centro de la pantalla
    translate(width / 2, height / 2);
    scale(s);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i + 1] != undefined) {
            balls[i].display(balls[i + 1]);
        } else {
            balls[i].display(balls[i]);
        }
    }
}

class Ball {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    display(_next) {
        noStroke();
        fill("#ff595e");
        ellipse(this.x, this.y, 32, 32);
    }
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;

    var sqrt = Math.sqrt(num);

    for (var i = 2; i <= sqrt; i++) if (num % i === 0) return false;
    return true;
}
