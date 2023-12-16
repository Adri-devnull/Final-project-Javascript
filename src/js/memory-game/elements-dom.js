// TABLERO DEL JUEGO 
const gameBoardElement = document.getElementById('game-board');
// CONTAINER DE ACIERTOS Y MOVIMIENTOS
const hitsElement = document.getElementById('hits');
const movementsElement = document.getElementById('movements');
// ELEMENTO CON EL CONTADOR DEL JUEGO
const countDownElement = document.getElementById('timer');
// BOTON DE START y RESTART GAME
const btnStartGameElement = document.getElementById('btn-play');
const btnRestartGameElement = document.getElementById('btn-restart');
// CONTENEDOR DEL JUEGO
const gameContainerElement = document.getElementById('game-container');
// BANNERS
const bannerWinGameElement = document.getElementById('banner-win');
const bannerLoseGameElement = document.getElementById('banner-lose');

export {
    gameBoardElement,
    hitsElement,
    movementsElement,
    countDownElement,
    btnStartGameElement,
    btnRestartGameElement,
    gameContainerElement,
    bannerWinGameElement,
    bannerLoseGameElement
}