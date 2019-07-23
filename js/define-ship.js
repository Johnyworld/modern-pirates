import { WIND, fonts } from '../index';

class DefineShip {
    constructor(ctx, canvas, Image)  {
        this.image = Image;
        this.ctx = ctx;
        this.canvas = canvas;
        this.maxSpeed = 0.5;
        this.speed = 0.02;
        this.maxHp = 150;
        this.hp = this.maxHp;
        this.armor = 10;

        this.width = 47;
        this.height = 29;

        this.ing = {
            pow : false,
            ang : false,
            rld : false,
            engn : false
        }

        this.pos = {
            x : 30,
            y : 282 - this.height
        }

        this.vel = {
            x: 0,
            y: 0
        }

        this.cannon = {
            pow: 3,
            maxPow: 5,
            ang: 30,
            rld: 2500,
            accuracy: 5,
        }
    }

    draw() {
        this.ctx.drawImage( 
            this.image, 
            0, 0,
            this.width, this.height,
            this.pos.x, this.pos.y, 
            this.width, this.height
        );

        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#2064e2";
        this.ctx.fillText(this.hp, this.pos.x+this.width/2-3, this.pos.y + this.height + fonts.showHp);
    }  

    update() {
        this.pos.x += this.vel.x + WIND.x/30;

        if ( this.pos.x < 0 ) {
            this.pos.x = 0;
            this.vel.x = .1;
        }

        if ( this.pos.x > this.canvas.width - this.width ) {
            this.pos.x = this.canvas.width - this.width;
            this.vel.x = -.1;
        }

        this.draw();
    }
}

export default DefineShip;