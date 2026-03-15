import { WIND, fonts } from '../index';

class DefinePirates {
    constructor(ctx, Image) {
        this.image = Image;
        this.ctx = ctx;
        this.maxHp = Math.floor(20 + (Math.floor(Math.random()*5)*5));
        this.hp = this.maxHp;
        this.armor = 5;
        this.score = this.maxHp + 20;

        this.width = 26;
        this.height = 10;

        this.pos = {
            x : 1024 + Math.random()*200,
            y : 282 - this.height
        }
        
        this.vel = {
            x: -0.2 - Math.random()*.1,
            y: 0
        }

    }

    draw() {
        this.ctx.drawImage( 
            this.image, 
            0, 29, 
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width, this.height,
        );

        const barY = this.pos.y - 6;
        const hpBarWidth = this.width / 2;
        const hpBarX = this.pos.x + this.width / 4;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(hpBarX, barY, hpBarWidth, 3);
        this.ctx.fillStyle = '#f44';
        this.ctx.fillRect(hpBarX, barY, hpBarWidth * (this.hp / this.maxHp), 3);
    }  

    update() {
        this.pos.x += this.vel.x + WIND.x/30;
        this.draw();
    }
}

export default DefinePirates;