import { WIND } from '../index';

class CannonBall {
    constructor(ctx, X, Y, Cannon, isEnemy ) {
        this.ctx = ctx;
        this.weight = 0.07;
        this.isEnemy = isEnemy;
        this.straightFrames = 24; // 약 0.4초간 직선 비행 후 중력 적용

        this.width = 4;
        this.height = 2;

        this.pos = {
            x: X,
            y: Y
        }

        const radians = Cannon.ang * Math.PI / 180;
        const speed = (Cannon.pow + 4) * 0.5;
        const scatter = Math.random() / Cannon.accuracy;

        this.vel = {
            x : speed * Math.cos(radians) + scatter,
            y : -speed * Math.sin(radians) + scatter,
        }

        if ( this.isEnemy ) {
            this.vel.x = -this.vel.x;
        }

    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(
            this.pos.x, this.pos.y, 
            this.width, this.height
        );
    }

    update() {
        if (this.straightFrames > 0) {
            this.straightFrames--;
        } else {
            this.vel.y += this.weight;
        }
        this.pos.x += this.vel.x + WIND.x/3;
        this.pos.y += this.vel.y;
        this.draw();
    }
}

export default CannonBall;