import { WIND, playerA, fonts } from '../index';

class DefineFrigates {
    constructor(ctx, Image) {
        this.image = Image;
        this.ctx = ctx;
        this.maxHp = Math.floor(80 + (Math.floor(Math.random()*5)*10) );
        this.hp = this.maxHp
        this.armor = 5;
        this.score = this.maxHp + 50;
        this.canFire = true;

        this.width = 48;
        this.height = 27;

        this.posfix = Math.random()*300;
        this.speedfix = Math.floor( Math.random()*5 ) /100;

        this.pos = {
            x : 1024 + this.posfix,
            y : 282 - this.height
        }
        
        this.vel = {
            x: -0.08,
            y: 0
        }

        this.cannon = {
            pow: 5,
            maxPow: 5,
            ang: 30,
            rld: 7000,
            accuracy: .5
        }

    }

    delay() {
        setTimeout(() => {
            this.canFire = true;
        }, this.cannon.rld);
    }

    draw() {
        this.ctx.drawImage( 
            this.image, 
            0, 39, 
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width, this.height,
        );

        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#2064e2";
        this.ctx.fillText(this.hp, this.pos.x+this.width/2, this.pos.y + this.height + fonts.showHp);
    }  

    update() {
        this.pos.x += this.vel.x + WIND.x/30;

        if ( this.pos.x >= 600+this.posfix ) {
            this.vel.x = -0.2 + this.speedfix;
        } 

        if ( this.pos.x >= 500+this.posfix && this.pos.x < 600+this.posfix ) {
            this.vel.x = -0.08 + this.speedfix;
        } 

        if ( this.pos.x >= 350+this.posfix && this.pos.x < 450+this.posfix ) {
            this.vel.x = 0;
        } 

        if ( this.pos.x < 300+this.posfix ) {
            this.vel.x = .1;
        } 

        this.cannon.pow = 1 + (WIND.x/7) + ( (this.pos.x - playerA.pos.x) / 140 );
        this.draw();
    }
}

export default DefineFrigates;