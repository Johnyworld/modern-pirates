import { WIND, playerA, SCORE, fonts } from '../index';

export const textBoard = (ctxPrts) => {

    let windDir = '';
    
    const playerUI = { x: 20, y: 30 };

    let line1 = 20;
    let line2 = 40;
    let line3 = 60;
    let line4 = 80;
    let line5 = 100;
    let column1 = 10;
    let column2 = 100;

    if ( window.innerWidth < 767 ) {
        line1 = 30;
        line2 = 60;
        line3 = 90;
        line4 = 120;
        line5 = 150;
        column1 = 20;
        column2 = 180;
    }

    if (WIND.x > 4) { windDir = ">>>>>" }
    else if (WIND.x > 3) { windDir = ">>>>" }
    else if (WIND.x > 2) { windDir = ">>>" }
    else if (WIND.x > 1) { windDir = ">>" }
    else if (WIND.x > 0) { windDir = ">" }
    else if (WIND.x < -4) { windDir = "<<<<<" }
    else if (WIND.x < -3) { windDir = "<<<<" }
    else if (WIND.x < -2) { windDir = "<<<" }
    else if (WIND.x < -1) { windDir = "<<" }
    else if (WIND.x < 0) { windDir = "<" }

    if (WIND.x < -5) { WIND.x = -5 }
    if (WIND.x > 5) { WIND.x = 5 }
    
    // 큰 제목
    ctxPrts.font = fonts.normal;
    ctxPrts.fillStyle = "white";
    ctxPrts.textAlign = "left";
    ctxPrts.fillText("Battle Ship", playerUI.x, playerUI.y);
    ctxPrts.fillText("Wind", column2*2, 30);

    // 플레이어 스테이터스
    ctxPrts.font = fonts.normal;
    ctxPrts.fillStyle = "#999999";
    ctxPrts.fillText("Angle :", playerUI.x+column1, playerUI.y+line1);
    ctxPrts.fillText("Power :", playerUI.x+column1, playerUI.y+line2);
    ctxPrts.fillText("Engine :", playerUI.x+column1, playerUI.y+line3);
    ctxPrts.fillText("Armor :", playerUI.x+column1, playerUI.y+line4);
    ctxPrts.fillText("Score :", playerUI.x+column1, playerUI.y+line5);

    // 플레이어 스테이터스 수치
    ctxPrts.textAlign = "right";
    ctxPrts.fillText(playerA.cannon.ang.toFixed(1), playerUI.x+column2, playerUI.y+line1);
    ctxPrts.fillText(playerA.cannon.pow, playerUI.x+column2, playerUI.y+line2);
    ctxPrts.fillText((playerA.vel.x*100).toFixed(1), playerUI.x+column2, playerUI.y+line3);
    ctxPrts.fillText(playerA.armor, playerUI.x+column2, playerUI.y+line4);
    ctxPrts.fillText(SCORE, playerUI.x+column2, playerUI.y+line5);

    // 플레이어 스테이터스 최대수치
    ctxPrts.textAlign = "left";
    ctxPrts.fillStyle = "#555555";
    ctxPrts.fillText('/ 20 - 70', playerUI.x+column2+5, playerUI.y+line1);
    ctxPrts.fillText('/ '+playerA.cannon.maxPow, playerUI.x+column2+5, playerUI.y+line2);
    ctxPrts.fillText('/ ' +playerA.maxSpeed*100, playerUI.x+column2+5, playerUI.y+line3);

    // 바람
    ctxPrts.font = fonts.subhead;
    ctxPrts.fillText(windDir, column2*2+line3, 36);
    ctxPrts.font = fonts.normal;
}
