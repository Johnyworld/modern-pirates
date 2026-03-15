import { playerA, cannonBalls } from '../index';
import CannonBall from './cannon-ball';

const engineDown = () => {
    if ( playerA.ing.engn === false && playerA.vel.x > -playerA.maxSpeed ) {
        playerA.ing.engn = true;
        let max = playerA.vel.x - 0.1;
        const frame = () => {
            if ( playerA.vel.x <= max+0.01 ) {
                playerA.ing.engn = false;
                playerA.vel.x = max;
                clearInterval(id);
            } else {
                playerA.vel.x -= 0.003;
            }
        }
        let id = setInterval(frame, 40);
    }
}

const engineUp = () => {
    if ( playerA.ing.engn === false && playerA.vel.x < playerA.maxSpeed ) {
        playerA.ing.engn = true;
        let max = playerA.vel.x + 0.1;
        const frame = () => {
            if ( playerA.vel.x >= max ) {
                playerA.ing.engn = false;
                playerA.vel.x = max;
                clearInterval(id);
            } else {
                playerA.vel.x += 0.003;
            }
        }
        let id = setInterval(frame, 40);
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

const gameKeys = (event, key=event.keyCode) => {

    // EngineDown : Arrow left
    if (key === 37) { engineDown(); }

    // Right : Arrow right
    if (key === 39) { engineUp(); }

    // Angle Up : Arrow up
    if (key === 38) { angleUp(); }

    // Angle Down : Arrow down
    if (key === 40) { angleDown(); }

    // Cannon Fire : Space bar
    if (key === 32) { fire(); }

    // Power Up : >
    if (key === 190) { powerUp(); }

    // Power Down : <
    if (key === 188) { powerDown(); }
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
    document.addEventListener( 'keydown', gameKeys );
    canvas.addEventListener( 'mousemove', handleMouseMove );
    canvas.addEventListener( 'touchmove', handleTouchMove );
    jsKeyEngineDown.addEventListener( 'click', engineDown )
    jsKeyAngleDown.addEventListener( 'click', angleDown )
    jsKeyAngleUp.addEventListener( 'click', angleUp )
    jsKeyEngineUp.addEventListener( 'click', engineUp )
    jsKeyPowerUp.addEventListener( 'click', powerUp )
    jsKeyPowerDown.addEventListener( 'click', powerDown )
    jsKeyFire.addEventListener( 'click', fire )
}

export const removeKeyStates = () => {
    const canvas = document.getElementById('jsCanvasPirates');
    document.removeEventListener( 'keydown', gameKeys );
    canvas.removeEventListener( 'mousemove', handleMouseMove );
    canvas.removeEventListener( 'touchmove', handleTouchMove );
}

// export default keyStates;