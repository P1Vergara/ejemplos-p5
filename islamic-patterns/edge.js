class Edge {
    constructor(_a, _b) {
        this.a = _a;
        this.b = _b;
        this.h1;
        this.h2;
    }

    show() {
        this.h1.show();
        this.h2.show();
    }

    hankin(sides) {
        let mid = p5.Vector.add(this.a, this.b);
        mid.mult(0.5);

        let v1 = p5.Vector.sub(this.a, mid);
        let v2 = p5.Vector.sub(this.b, mid);

        let edgeLength = v1.mag() + delta;

        let offset1 = mid;
        let offset2 = mid;

        if (delta > 0) {
            v1.setMag(delta);
            v2.setMag(delta);
            offset1 = p5.Vector.add(mid, v2);
            offset2 = p5.Vector.add(mid, v1);
        }

        v1.normalize();
        v2.normalize();

        v1.rotate(radians(-angle));
        v2.rotate(radians(angle));

        let interiorAngle = ((sides - 2) * PI) / sides;
        let alpha = interiorAngle * 0.5;
        let beta = PI - radians(angle) - alpha;
        let hankenLength = (edgeLength * sin(alpha)) / sin(beta);

        v1.setMag(hankenLength);
        v2.setMag(hankenLength);

        this.h1 = new Hankin(offset1, v1);
        this.h2 = new Hankin(offset2, v2);
    }
}

function Hankin(a, v) {
    this.a = a;
    this.v = v;
    this.b = p5.Vector.add(a, v);

    this.show = function () {
        stroke("#ffca3a");
        strokeWeight(4);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    };
}
