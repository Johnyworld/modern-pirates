import { WIND } from '../index';

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

        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#2064e2";
        this.ctx.fillText(this.hp, this.pos.x+this.width/2, this.pos.y + this.height + 20);
    }  

    update() {
        this.pos.x += this.vel.x + WIND.x/30;
        this.draw();
    }
}

export default DefinePirates;