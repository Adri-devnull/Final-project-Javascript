// ELEMENTO CONTENEDOR DEL TABLERO DEL JUEGO
const gameBoardElement = document.getElementById('game-board');
// ELEMENTO CONTENEDOR MINAS RESTANTES
const minesCountElement = document.getElementById('mines-span');
// BOTON DE PONER BANDERAS
const flagsButtonElement = document.getElementById('flag-btn');
// BOTON PARA COMENZAR LA PARTIDA
const newGameButtonElement = document.getElementById('newgame-btn');
// BOTON PARA REINICIAR LA PARTIDA
const restartGameButtonElement = document.getElementById('restartgame-btn');
// ELEMENTO SPAN DEL TIEMPO
const timeElement = document.getElementById('span-time');

export {
    gameBoardElement,
    minesCountElement,
    flagsButtonElement,
    newGameButtonElement,
    restartGameButtonElement,
    timeElement
}