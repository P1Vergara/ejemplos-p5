class Particle {
    constructor() {
        this.pos = createVector(width, random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 20;
        this.prevPos = this.pos.copy();
    }

    update() {
        // actualizar la velocidad y posicion
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(vectors) {
        // conseguir posicion en relacion a la escala
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);

        // pasar las columnas al indice
        let index = x + y * columns;

        // conseguir la fuerza desde el flow fields
        let force = vectors[index];

        // call apply force passing the force
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show(offset) {
        if (floor(random(2)) === 1) {
            stroke(106, 76, 147);
        } else {
            stroke(255, 202, 58);
        }

        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrevious();
    }

    updatePrevious() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        // check para evitar que particulas escapen los limites de la pantalla
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrevious();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrevious();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrevious();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrevious();
        }
    }
}
