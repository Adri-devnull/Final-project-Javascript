import { printBoardLetters, printLives, printWordToGuess, letterPressed, verifyLetterInWord, initialLifeCount } from "./functions";
import { lettersElement } from "./elements-dom";

// LLAMADA A LA FUNCION PARA PINTAR EL TABLERO CON LAS LETRAS DEL JUEGO
printBoardLetters();

// LLAMADA A FUNCION PARA PINTAR LAS VIDAS DEL JUGADOR
printLives(initialLifeCount);

// LLAMADA A LA FUNCION PARA PINTAR LA PALABRA A ADIVINAR
printWordToGuess();

// EVENTO DE ESCUCHA PARA LAS LETRAS DEL JUEGO
lettersElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('letter')) {
        letterPressed(e.target.textContent)
        verifyLetterInWord(e.target.textContent)
    }
});
