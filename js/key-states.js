import { playerA, cannonBalls } from '../index';
import CannonBall from './cannon-ball';

// 엔진 누름 상태 추적
const engineState = { left: false, right: false };
let engineInterval = null;

const engineTick = () => {
    if (!playerA) return;
    const engineVelocity = 0.004;
    if (engineState.left && playerA.vel.x > -playerA.maxSpeed) {
        playerA.vel.x = Math.max(-playerA.maxSpeed, playerA.vel.x - engineVelocity);
    }
    if (engineState.right && playerA.vel.x < playerA.maxSpeed) {
        playerA.vel.x = Math.min(playerA.maxSpeed, playerA.vel.x + engineVelocity);
    }
}

const setEngineLeft = (active) => {
    engineState.left = active;
    if (active && !engineInterval) {
        engineInterval = setInterval(engineTick, 16);
    } else if (!active && !engineState.right) {
        clearInterval(engineInterval);
        engineInterval = null;
    }
}

const setEngineRight = (active) => {
    engineState.right = active;
    if (active && !engineInterval) {
        engineInterval = setInterval(engineTick, 16);
    } else if (!active && !engineState.left) {
        clearInterval(engineInterval);
        engineInterval = null;
    }
}

const angleUp = () => {
    event.preventDefault();
    if ( playerA.ing.ang === false && playerA.cannon.ang < 80 ) {
        playerA.ing.ang = true;
        let max = playerA.cannon.ang + 5;
        const frame = () => {
            if ( playerA.cannon.ang >= max ) {
                playerA.ing.ang = false;
                playerA.cannon.ang = max;
                clearInterval(id);
            } else {
                playerA.cannon.ang += 0.1;
            }
        }
        let id = setInterval(frame, 30);
    }
}

const angleDown = () => {
    event.preventDefault();
    if ( playerA.ing.ang === false && playerA.cannon.ang > 0 ) {
        playerA.ing.ang = true;
        let max = playerA.cannon.ang - 5;
        const frame = () => {
            if ( playerA.cannon.ang <= max ) {
                playerA.ing.ang = false;
                playerA.cannon.ang = max;
                clearInterval(id);
            } else {
                playerA.cannon.ang -= 0.1;
            }
        }
        let id = setInterval(frame, 30);
    }
}

const fire = () => {
    const canvasPrts = document.getElementById('jsCanvasPirates');
    const ctxPrts = canvasPrts.getContext('2d');
    event.preventDefault();
    if ( playerA.ing.rld === false ) {
        playerA.ing.rld = true;
        cannonBalls.push( new CannonBall(ctxPrts, playerA.pos.x+playerA.width+2, playerA.pos.y+13, playerA.cannon) );
        setTimeout(() => {
            playerA.ing.rld = false;
        }, playerA.cannon.rld);
    }
}

const powerUp = () => {
    if ( playerA.cannon.pow < playerA.cannon.maxPow ) {
        playerA.cannon.pow += 1;
    }
}

const powerDown = () => {
    if ( playerA.cannon.pow > 1 ) {
        playerA.cannon.pow -= 1;
    }
}

const gameKeysDown = (event) => {
    const code = event.code;

    // EngineDown : Arrow left, A
    if (code === 'ArrowLeft' || code === 'KeyA') { setEngineLeft(true); }

    // EngineUp : Arrow right, D
    if (code === 'ArrowRight' || code === 'KeyD') { setEngineRight(true); }

    // Angle Up : Arrow up, W
    if (code === 'ArrowUp' || code === 'KeyW') { angleUp(); }

    // Angle Down : Arrow down, S
    if (code === 'ArrowDown' || code === 'KeyS') { angleDown(); }

    // Cannon Fire : Space bar
    if (code === 'Space') { fire(); }

    // Power Up : >
    if (code === 'Period') { powerUp(); }

    // Power Down : <
    if (code === 'Comma') { powerDown(); }
}

const gameKeysUp = (event) => {
    const code = event.code;
    if (code === 'ArrowLeft' || code === 'KeyA') { setEngineLeft(false); }
    if (code === 'ArrowRight' || code === 'KeyD') { setEngineRight(false); }
}

const handleMouseMove = (event) => {
    if (!playerA) return;
    const canvas = document.getElementById('jsCanvasPirates');
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

    // 함선 포구 위치 기준점
    const originX = playerA.pos.x + playerA.width;
    const originY = playerA.pos.y + playerA.height / 2;
    const dx = mouseX - originX;
    const dy = mouseY - originY;

    // 각도: 함선 → 마우스 방향의 실제 각도 (캔버스 Y축 반전 보정)
    const rawAngle = Math.atan2(-dy, dx) * (180 / Math.PI);
    playerA.cannon.ang = Math.min(80, Math.max(0, rawAngle));

    // 파워: 함선~마우스 거리 기준, 화면 절반(512px) 거리에서 최대 파워
    const distance = Math.sqrt(dx * dx + dy * dy);
    const halfScreen = canvas.width / 2;
    const newPow = 1 + (distance / halfScreen) * (playerA.cannon.maxPow - 1);
    playerA.cannon.pow = Math.min(playerA.cannon.maxPow, Math.max(1, Math.round(newPow)));
}

const handleTouchMove = (event) => {
    if (!playerA) return;
    const touch = event.touches[0];
    handleMouseMove(touch);
}

export const keyStates = () => {
    const canvas = document.getElementById('jsCanvasPirates');
    document.addEventListener( 'keydown', gameKeysDown );
    document.addEventListener( 'keyup', gameKeysUp );
    canvas.addEventListener( 'mousemove', handleMouseMove );
    canvas.addEventListener( 'touchmove', handleTouchMove );
    canvas.addEventListener( 'click', fire );
    jsKeyEngineDown.addEventListener( 'mousedown', () => setEngineLeft(true) );
    jsKeyEngineDown.addEventListener( 'mouseup', () => setEngineLeft(false) );
    jsKeyEngineDown.addEventListener( 'mouseleave', () => setEngineLeft(false) );
    jsKeyEngineDown.addEventListener( 'touchstart', () => setEngineLeft(true) );
    jsKeyEngineDown.addEventListener( 'touchend', () => setEngineLeft(false) );
    jsKeyEngineUp.addEventListener( 'mousedown', () => setEngineRight(true) );
    jsKeyEngineUp.addEventListener( 'mouseup', () => setEngineRight(false) );
    jsKeyEngineUp.addEventListener( 'mouseleave', () => setEngineRight(false) );
    jsKeyEngineUp.addEventListener( 'touchstart', () => setEngineRight(true) );
    jsKeyEngineUp.addEventListener( 'touchend', () => setEngineRight(false) );
    jsKeyAngleDown.addEventListener( 'click', angleDown )
    jsKeyAngleUp.addEventListener( 'click', angleUp )
    jsKeyPowerUp.addEventListener( 'click', powerUp )
    jsKeyPowerDown.addEventListener( 'click', powerDown )
    jsKeyFire.addEventListener( 'click', fire )
}

export const removeKeyStates = () => {
    const canvas = document.getElementById('jsCanvasPirates');
    document.removeEventListener( 'keydown', gameKeysDown );
    document.removeEventListener( 'keyup', gameKeysUp );
    canvas.removeEventListener( 'mousemove', handleMouseMove );
    canvas.removeEventListener( 'touchmove', handleTouchMove );
    canvas.removeEventListener( 'click', fire );
    setEngineLeft(false);
    setEngineRight(false);
}

// export default keyStates;