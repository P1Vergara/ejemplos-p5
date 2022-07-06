class Curve {
    constructor() {
        this.path = [];
        this.current = createVector();
    }

    setX(_x) {
        this.current.x = _x;
    }

    setY(_y) {
        this.current.y = _y;
    }

    addPoint() {
        this.path.push(this.current);
    }

    reset() {
        this.path.length = 0;
    }

    show() {
        stroke("#6a4c93");
        strokeWeight(1);
        noFill();

        beginShape();
        this.path.forEach((v) => {
            vertex(v.x, v.y);
        });
        endShape();

        // punto
        stroke("#fb5607");
        strokeWeight(8);
        point(this.current.x, this.current.y);
        this.current = createVector();
    }
}
