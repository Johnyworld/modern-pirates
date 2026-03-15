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
            maxPow: 10,
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

        // 각도 표시선
        const radians = this.cannon.ang * Math.PI / 180;
        const originX = this.pos.x + this.width;
        const originY = this.pos.y + this.height / 2;
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(originX, originY);
        const lineLength = 4 + this.cannon.pow * 2;
        this.ctx.lineTo(originX + lineLength * Math.cos(radians), originY - lineLength * Math.sin(radians));
        this.ctx.stroke();

        // HP 바 (함선 위)
        const barY = this.pos.y - 6;
        const hpBarWidth = this.width / 2;
        const hpBarX = this.pos.x + this.width / 4;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(hpBarX, barY, hpBarWidth, 3);
        this.ctx.fillStyle = '#2f6';
        this.ctx.fillRect(hpBarX, barY, hpBarWidth * (this.hp / this.maxHp), 3);

        // 엔진 게이지
        const gaugeHalfWidth = 20;
        const gaugeCenterX = this.pos.x + this.width / 2;
        const gaugeY = this.pos.y + this.height + 4;
        const barWidth = (this.vel.x / this.maxSpeed) * gaugeHalfWidth;

        // 배경 트랙
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(gaugeCenterX - gaugeHalfWidth, gaugeY, gaugeHalfWidth * 2, 3);

        // 게이지 바 (양수: 오른쪽 파란색, 음수: 왼쪽 노란색)
        this.ctx.fillStyle = barWidth >= 0 ? '#4af' : '#fa4';
        this.ctx.fillRect(
            barWidth >= 0 ? gaugeCenterX : gaugeCenterX + barWidth,
            gaugeY,
            Math.abs(barWidth),
            3
        );

        // 중앙 세로선
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(gaugeCenterX, gaugeY - 1, 1, 5);
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