import { WIND, playerA, SCORE } from '../index';

export const textBoard = (ctxPrts) => {

    let windDir = '';
    
    const playerUI = { x: 20, y: 30 };
    const line1 = 20;
    const line2 = 40;
    const line3 = 60;
    const line4 = 80;
    const line5 = 100;

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
    ctxPrts.font = "16px Open Sans";
    ctxPrts.fillStyle = "white";
    ctxPrts.textAlign = "left";
    ctxPrts.fillText("Battle Ship", playerUI.x, playerUI.y);
    ctxPrts.fillText("Wind", 200, 30);

    // 플레이어 스테이터스
    ctxPrts.font = "14px Open Sans";
    ctxPrts.fillStyle = "#999999";
    ctxPrts.fillText("Angle :", playerUI.x+10, playerUI.y+line1);
    ctxPrts.fillText("Power :", playerUI.x+10, playerUI.y+line2);
    ctxPrts.fillText("Engine :", playerUI.x+10, playerUI.y+line3);
    ctxPrts.fillText("Armor :", playerUI.x+10, playerUI.y+line4);
    ctxPrts.fillText("Score :", playerUI.x+10, playerUI.y+line5);

    // 플레이어 스테이터스 수치
    ctxPrts.textAlign = "right";
    ctxPrts.fillText(playerA.cannon.ang.toFixed(1), playerUI.x+90, playerUI.y+line1);
    ctxPrts.fillText(playerA.cannon.pow, playerUI.x+90, playerUI.y+line2);
    ctxPrts.fillText((playerA.vel.x*100).toFixed(1), playerUI.x+90, playerUI.y+line3);
    ctxPrts.fillText(playerA.armor, playerUI.x+90, playerUI.y+line4);
    ctxPrts.fillText(SCORE, playerUI.x+90, playerUI.y+line5);

    // 플레이어 스테이터스 최대수치
    ctxPrts.textAlign = "left";
    ctxPrts.fillStyle = "#555555";
    ctxPrts.fillText('/ 20 - 70', playerUI.x+95, playerUI.y+line1);
    ctxPrts.fillText('/ '+playerA.cannon.maxPow, playerUI.x+95, playerUI.y+line2);
    ctxPrts.fillText('/ ' +playerA.maxSpeed*100, playerUI.x+95, playerUI.y+line3);

    // 바람
    ctxPrts.font = "24px Open Sans";
    ctxPrts.fillText(windDir, 250, 33);
    ctxPrts.font = "14px Open Sans";
    // ctxPrts.fillText(Math.abs(WIND.x.toFixed(0)), 300, 30);

    

    // ctxPrts.textAlign = "center";
    // ctxPrts.fillStyle = "#704358";
    // ctxPrts.fillText(playerA.hp, playerA.pos.x+15, playerA.pos.y+50);
}
