import { createGameBoard, restartGame, moveMoleorBombRandom, countDown, showLose, whackaMole } from "./functions";
import { btnRestartGameElement, btnStartElement, boardGameElement } from "./elements-dom";

// LLAMADA A LA FUNCION PARA PINTAR EL TABLERO DE JUEGO
createGameBoard();

// EVENTO DE ESCUCHA PARA REINICIAR EL JUEGO CLICANDO EN EL BOTON
btnRestartGameElement.addEventListener('click', () => {
    restartGame()
})

// EVENTO DE ESCUCHA PARA INICIAR EL JUEGO CLICANDO EN EL BOTON
btnStartElement.addEventListener('click', () => {
    moveMoleorBombRandom();
    countDown()
})

// EVENTO DE ESCUCHA PARA SABER CUANDO SE HA PINCHADO EN EL TABLERO DE JUEGO
boardGameElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('bomb')) {
        showLose();
    } else {
        whackaMole(event);
    }
})