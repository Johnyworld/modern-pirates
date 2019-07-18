import { playerA, cannonBalls } from '../index';
import CannonBall from './cannon-ball';

const gameKeys = (event) => {
    const canvasPrts = document.getElementById('jsCanvasPirates');
    const ctxPrts = canvasPrts.getContext('2d');

    let key = event.keyCode;

    // Left : Arrow left
    if (key === 37) {
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

    // Right : Arrow right
    if (key === 39) {
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

    // Angle Up : Arrow up
    if (key === 38) {
        event.preventDefault();
        if ( playerA.ing.ang === false && playerA.cannon.ang < 70 ) {
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

    // Angle Down : Arrow down
    if (key === 40) {
        event.preventDefault();
        if ( playerA.ing.ang === false && playerA.cannon.ang > 20 ) {
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

    // Cannon Fire : Space bar
    if (key === 32) {
        event.preventDefault();
        if ( playerA.ing.rld === false ) {
            playerA.ing.rld = true;
            cannonBalls.push( new CannonBall(ctxPrts, playerA.pos.x+playerA.width+2, playerA.pos.y+13, playerA.cannon) );
            setTimeout(() => {
                playerA.ing.rld = false;
            }, playerA.cannon.rld);
        }
    }

    // Power Down : <
    if (key === 188) {
        if ( playerA.cannon.pow > 1 ) {
            playerA.cannon.pow -= 1;
            // setTimeout(() => {
            // }, playerA.cannon.rld);
        }
    }

    // Power Up : >
    if (key === 190) {
        if ( playerA.cannon.pow < playerA.cannon.maxPow ) {
            playerA.cannon.pow += 1;
            // setTimeout(() => {
            // }, playerA.cannon.rld);
        }
    }
}

export const keyStates = () => {
    document.addEventListener( 'keydown', gameKeys );
}

export const removeKeyStates = () => {
    document.removeEventListener( 'keydown', gameKeys );
}

// export default keyStates;