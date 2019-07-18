import { WIND } from '../index';

class CannonBall {
    constructor(ctx, X, Y, Cannon, isEnemy ) {
        this.ctx = ctx;
        this.mathCannon = Math.floor(Cannon.ang / 90 * 100) + 5;
        this.weight = 0.07;
        this.isEnemy = isEnemy;

        this.width = 4;
        this.height = 2;

        this.pos = {
            x: X,
            y: Y
        }

        this.pow = {
            y : - (Cannon.pow + 4) * this.mathCannon / 100,
            x : (Cannon.pow + 4) * (100 - this.mathCannon) / 100,
        }

        this.vel = {
            x : this.pow.x + Math.random() / Cannon.accuracy,
            y : this.pow.y + Math.random() / Cannon.accuracy
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
        this.vel.y += this.weight;
        this.pos.x += this.vel.x + WIND.x/3 ;
        this.pos.y += this.vel.y;
        this.draw();   
    }
}

export default CannonBall;