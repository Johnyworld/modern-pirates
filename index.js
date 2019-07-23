import DefineShip from './js/define-ship';
import DefinePirates from './js/define-pirates';
import DefineFrigates from './js/define-frigates';
import CannonBall from './js/cannon-ball';
import { textBoard } from './js/interface';
import { keyStates, removeKeyStates } from './js/key-states';

export let playerA;
export let SCORE = 0;
export let enemies = [];
export let cannonBalls = [];
export let WIND = {
    x: 4,
}

const canvasPrts = document.getElementById('jsCanvasPirates');
const ctxPrts = canvasPrts.getContext('2d', { alpha: false });
ctxPrts.imageSmoothingEnabled = false;

// 확대 방지
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 폰트
export let fonts = {}
if ( window.innerWidth < 767 ) {
    fonts = {
        title : '90px Open Sans',
        subhead : '50px Open Sans',
        normal : '28px Open Sans',
        showHp : 35,
    }
} else {
    fonts = {
        title : '52px Open Sans',
        subhead : '32px Open Sans',
        normal : '16px Open Sans',
        showHp : 20,
    }
}

// 캔버스 크기
canvasPrts.width = 1024;
canvasPrts.height = 400;

// 이미지 로드
let imageSprite = new Image();
let bgImage = new Image();
let titleImage = new Image();
let keyMapImage = new Image();

// import spriteUrl from './images/pirates-sprite.png';
// import bgUrl from './images/pirates-bg.jpg';
// import titleUrl from './images/title.png';
// import keyMapUrl from './images/keymap.png';

imageSprite.src = './images/pirates-sprite.png';
bgImage.src = './images/pirates-bg.jpg';
titleImage.src = './images/title.png';
keyMapImage.src = './images/keymap.png';

// 게임 스테이트 머신
const GAME_STATE_TITLE = 0;
const GAME_STATE_NEW_LEVEL = 1;
const GAME_STATE_LEVEL = 2;
const GAME_STATE_GAME_OVER = 3;

// let currentGameState = 0;
let currentGameStateFuntion = null;

const switchGameState = (newState) => {
    let currentGameState = newState;
    switch (currentGameState) {
        case GAME_STATE_TITLE:
            currentGameStateFuntion = gameStateTitle;
            break;
        case GAME_STATE_NEW_LEVEL:
            currentGameStateFuntion = gameStateSetLevel;
            break;
        case GAME_STATE_LEVEL:
            currentGameStateFuntion = gameStatePlayLevel;
            break;
        case GAME_STATE_GAME_OVER:
            currentGameStateFuntion = gameStateGameOver;
            break;
    }
}

// 게임 타이틀 화면
const gameStateTitle = () => {
    renderTitle();
    document.addEventListener('keydown', startKeydown);
    canvasPrts.addEventListener('click', gameStart);
}

// 게임 리셋
const gameStateSetLevel = () => {
    cannonBalls = [];
    enemies = [];
    WIND.x = 0;
    SCORE = 0;
    respawnEnemies();
    keyStates();
    reset();
    switchGameState(GAME_STATE_LEVEL);
}

// 게임 플레잉
const gameStatePlayLevel = () => {
    ctxPrts.clearRect(0, 0, canvasPrts.width, canvasPrts.height);
    ctxPrts.drawImage(bgImage, 0, 0);
    windy();
    checkCollision();
    checkGameOver();
    render();
    if (keyMapIndex > 0 && window.innerWidth > 1023) {
        renderKeymap();
    }
}

// 게임 오버
const gameStateGameOver = () => {
    renderGameOver();
    removeKeyStates();
    clearrespawnEnemies();
    document.addEventListener('keydown', startKeydown);
    canvasPrts.addEventListener('click', gameStart);
}

// 스페이스 누르면 게임 시작
const gameStart = () => {
    event.preventDefault();
    document.removeEventListener('keydown', startKeydown);
    canvasPrts.removeEventListener('click', gameStart);
    switchGameState(GAME_STATE_NEW_LEVEL);
}

const startKeydown = (event) => {
    let key = event.keyCode;
    if (key === 32) {
        gameStart();
    }
}

const runGame = () => {
    currentGameStateFuntion();
}

// 타이틀 화면
const renderTitle = () => {
    // 배경
    ctxPrts.fillStyle = '#000';
    ctxPrts.fillRect(0, 0, 1024, 400);

    // 제목
    ctxPrts.drawImage(titleImage, canvasPrts.width / 2 - titleImage.width / 2, canvasPrts.height / 2 - titleImage.height / 2 - 15);

    // Press Start
    ctxPrts.font = fonts.normal;
    ctxPrts.textAlign = "center";
    ctxPrts.fillStyle = "#864f6e";
    ctxPrts.fillText("Press spacebar or screen to start", canvasPrts.width / 2, canvasPrts.height / 2 + 110);
}

// 키 배치 보여주기
let keyMapIndex = 400;
const renderKeymap = () => {
    keyMapIndex = keyMapIndex - 1;
    ctxPrts.globalAlpha = keyMapIndex / 100;
    ctxPrts.drawImage(keyMapImage, 0, 0);
    ctxPrts.globalAlpha = 1.0;
}

const renderGameOver = () => {
    // 배경
    ctxPrts.fillStyle = '#000000';
    ctxPrts.fillRect(0, 0, 1024, 400);

    // 제목
    ctxPrts.fillStyle = "#ffffff";
    ctxPrts.textAlign = "center";
    ctxPrts.font = fonts.title;
    ctxPrts.fillText("GAME OVER", canvasPrts.width / 2, canvasPrts.height / 2);

    // Press Start
    ctxPrts.font = fonts.normal;
    ctxPrts.textAlign = "right";
    ctxPrts.fillText("Your Score : ", canvasPrts.width / 2 - 5, canvasPrts.height / 2 + 50);

    ctxPrts.font = fonts.subhead;
    ctxPrts.fillStyle = "#3976fe";
    ctxPrts.fillText(SCORE, canvasPrts.width / 2 + 75, canvasPrts.height / 2 + 55);

    ctxPrts.font = fonts.normal;
    ctxPrts.fillStyle = "#864f6e";
    ctxPrts.textAlign = "center";
    ctxPrts.fillText("Press Screen or Spacebar to Restart", canvasPrts.width / 2, canvasPrts.height / 2 + 110);
}

// 충돌검사 함수
const collisionDetection = (e1, e2) => {
    let e1Left = e1.pos.x;
    let e1Top = e1.pos.y;
    let e1Right = e1.pos.x + e1.width;
    let e1Bottom = e1.pos.y + e1.height;
    let e2Left = e2.pos.x;
    let e2Top = e2.pos.y;
    let e2Right = e2.pos.x + e2.width;
    let e2Bottom = e2.pos.y + e2.height;
    let retval = false;

    if ((e1Left > e2Right) || (e1Right < e2Left) || (e1Top > e2Bottom) || (e1Bottom < e2Top)) {
        retval = false;
    } else {
        retval = true;
    }
    return retval;
}

const checkCollision = () => {
    // 캐논 vs 적 충돌판정, 데미지 판정
    for (let i = cannonBalls.length - 1; i >= 0; i--) {
        const tempCannonBall = cannonBalls[i];
        if (tempCannonBall.isEnemy) {
            continue;
        } else {
            for (let j = enemies.length - 1; j >= 0; j--) {
                const tempEnemy = enemies[j];
                if (collisionDetection(tempEnemy, tempCannonBall)) {
                    let damage = Math.floor(tempCannonBall.vel.x * 5 + tempCannonBall.vel.y * 5 + WIND.x * 3);
                    let damageSum = damage - tempEnemy.armor;
                    if (damageSum <= 0) {
                        damageSum = 1;
                    }
                    cannonBalls.splice(i, 1);
                    tempEnemy.hp -= damageSum
                }
            }
        }
    }

    // 캐논 vs 플레이어 충돌판정, 데미지 판정
    for (let i = cannonBalls.length - 1; i >= 0; i--) {
        const tempCannonBall = cannonBalls[i];
        if (collisionDetection(playerA, tempCannonBall)) {
            let damage = Math.floor(-tempCannonBall.vel.x * 5 + tempCannonBall.vel.y * 5 + -WIND.x * 3);
            let damageSum = damage - playerA.armor;
            if (damageSum <= 0) {
                damageSum = 1;
            }
            cannonBalls.splice(i, 1);
            playerA.hp -= damageSum
        }
    }

    // 플레이어 vs 적 충돌판정
    for (let i = enemies.length - 1; i >= 0; i--) {
        const tempEnemy = enemies[i];
        if (collisionDetection(playerA, tempEnemy)) {
            let damage = Math.floor(playerA.vel.x * 50 + tempEnemy.hp / 2 + -tempEnemy.vel.x * 25 + -WIND.x * 5);
            function dmgSum(damage, armor) {
                let sum = damage - armor;
                if (sum <= 0) {
                    sum = 1;
                }
                return sum
            }
            playerA.hp -= dmgSum(damage, playerA.armor);
            tempEnemy.hp -= dmgSum(damage, tempEnemy.armor);
        }
    }

    // 적 파괴 판정
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].hp <= 0) {
            SCORE += enemies[i].score;
            enemies.splice(i, 1);
        }
    }

    // 적 프리깃함 캐논볼 쏘기 
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].cannon && enemies[i].canFire && enemies[i].pos.x < 1124) {
            cannonBalls.push(new CannonBall(ctxPrts, enemies[i].pos.x - 2, enemies[i].pos.y + 13, enemies[i].cannon, true));
            enemies[i].canFire = false;
            enemies[i].delay();
        }
    }
}

// 바람 컨트롤 함수
const windy = () => {
    let random = Math.floor(Math.random() * 7 - 3) / 100;
    if (WIND.x > 3) { random -= 0.01 }
    if (WIND.x < -3) { random += 0.01 }
    WIND.x += random;
    
}

const render = () => {
    // 포탄 그리기 
    for (let i = cannonBalls.length - 1; i >= 0; i--) {
        cannonBalls[i].update();
        if (cannonBalls[i].pos.y >= 282) {
            cannonBalls.splice(i, 1);
        }
    }

    // 플레이어 그리기
    playerA.update();

    // 해적 그리기
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
    }

    // UI 그리기
    textBoard(ctxPrts);
}

// 적 리스폰 인터벌
let respawnInterval = null;

const respawnEnemiesFunc = () => {
    let respawnPirates = Math.floor(Math.random() * 3);
    let respawnFrigates = Math.floor(Math.random() * 4);
    for (let i = 0; i < respawnPirates; i++) {
        enemies.push(new DefinePirates(ctxPrts, imageSprite));
    }
    for (let i = 2; i < respawnFrigates; i++) {
        enemies.push(new DefineFrigates(ctxPrts, imageSprite));
    }
}

const respawnEnemies = () => {
    respawnInterval = setInterval(respawnEnemiesFunc, 14000);
};

const clearrespawnEnemies = () => {
    clearInterval(respawnInterval);
}

// 새 게임 세팅
const reset = () => {
    playerA = new DefineShip(ctxPrts, canvasPrts, imageSprite);
    enemies.push(new DefinePirates(ctxPrts, imageSprite));
    enemies.push(new DefinePirates(ctxPrts, imageSprite));
    enemies.push(new DefinePirates(ctxPrts, imageSprite));
}

// 게임오버 체크
const checkGameOver = () => {
    if (playerA.hp <= 0) {
        switchGameState(GAME_STATE_GAME_OVER);
    }
}

// 게임 시작
switchGameState(GAME_STATE_TITLE);

let canvasFrames;
const runningGame = () => {
    canvasFrames = requestAnimationFrame(runningGame);
    runGame();
}

runningGame();

// TO DO

// 효과음 넣기
// GAME STATES 구현. (표지. 게임오버. 등)
// 레벨(스테이지) 구현.
// 점수 레더보드 
// 추진력, POWER 그래픽으로 GUI로 배치.
// 각도도 GUI로
// 방어막 구현
// 플레이어 레벨 구현 : maxHP, maxPOW, maxEngine, armor