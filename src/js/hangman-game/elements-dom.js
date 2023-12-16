// ELEMENTO CONTENEDOR DE LAS LETRAS DEL JUEGO
const lettersElement = document.getElementById('game-content-letters');
// ELEMENTO CONTENEDOR DE LA PALABRA DEL JUEGO
const wordElement = document.getElementById('game-content-word');
// ELEMENTO CONTENEDOR DE LAS VIDAS DEL USUARIO
const lifesElement = document.getElementById('game-content-lifes');
// ELEMENTO CONTENEDOR DE LOS FALLOS DEL USUARIO
const failsElement = document.getElementById('game-content-fails');
// ELEMENTO CONTENEDOR DE LA IMAGEN
const imageHangmanElement = document.getElementById('game-image');
// ELEMENTO CONTENEDOR DEL BOTON RESTART GAME
const btnRestartContainerElement = document.getElementById('btn-restart-container');
// ELEMENTO CONTENEDOR TITULO WIN O LOSE
const winLoseTitleElement = document.getElementById('title-win-lose');

export {
    lettersElement, wordElement, lifesElement, failsElement, imageHangmanElement, btnRestartContainerElement, winLoseTitleElement
}