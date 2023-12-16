import { restartGameButtonElement, flagsButtonElement } from "./elements-dom";
import { startGame, restartGame, isFlagActived } from "./functions";

// LLAMAMOS A LA FUNCION PARA CREAR EL TABLERO
startGame();

// EVENTO DE ESCUCHA PARA REINICIAR LA PARTIDA
restartGameButtonElement.addEventListener('click', () => {
    restartGame();
});

// EVENTO DE ESCUCHA PARA EL BOTON DE PONER BANDERAS
flagsButtonElement.addEventListener('click', isFlagActived);