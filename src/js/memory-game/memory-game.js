import { createGameBoard, restartGame } from "./functions";
import { btnRestartGameElement } from "./elements-dom";

// LLAMADA A FUNCION PARA PINTAR TABLERO DE JUEGO
createGameBoard()

// EVENTO DE ESCUCHA PARA EL BOTON REINICIAR JUEGO
btnRestartGameElement.addEventListener('click', () => {
    restartGame();
})