// ELEMENTO CONTENEDOR DE LAS LETRAS DEL JUEGO
const lettersElement = document.getElementById('game-content-letters');
// ELEMENTO CONTENEDOR DE LA PALABRA DEL JUEGO
const wordElement = document.getElementById('game-content-word');


// VARIABLES
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const words = ['vampiro', 'puzzle', 'mesa', 'lechuza', 'magia', 'mono', 'ojo'];
const fails = 5;

// FUNCION PINTAR TABLERO DE LETRAS 
const printBoardLetters = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < letters.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = letters[i];
        letter.classList.add('letter');
        fragment.append(letter);
    }
    lettersElement.append(fragment)
}

// LLAMADA A LA FUNCION PARA PINTAR EL TABLERO CON LAS LETRAS DEL JUEGO
printBoardLetters();

// FUNCION PARA ELEGIR GENERAR UNA PALABRA ALEATORIA
const generateRandomWord = () => {
    const randomNumber = Math.floor(Math.random() * words.length);
    const randomWord = words[randomNumber];
    return randomWord.toUpperCase();
}
// PALABRA GENERADA ALEATORIAMENTE
const randomWord = generateRandomWord();

// FUNCION PARA OBTENER EL VALOR DE LA TECLA QUE PRESIONA EL USUARIO
const letterPressed = (item) => {
    const letter = item;
    return letter
};

// FUNCION PARA PINTAR LA PALABRA PARA ADIVINAR
const printWordToGuess = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < randomWord.length; i++) {
        const letter = document.createElement('span');
        letter.classList.add('character');
        letter.textContent = randomWord[i];
        fragment.append(letter);
    }
    wordElement.append(fragment)
}

// LLAMADA A LA FUNCION PARA PINTAR LA PALABRA A ADIVINAR
printWordToGuess();

// FUNCION QUE COMPRUEBA SI ESTA LA LETRA EN LA PALABRA
const verifyLetterInWord = (item) => {
    const letter = letterPressed(item);
    const wordElements = wordElement.querySelectorAll('.character');
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
            wordElements[i].classList.add('showLetter');
        }
    }
}

// FUNCION QUE PINTA EL ERROR DE LA LETRA SI NO ESTA
const printLetterError = () => {
    
}

// EVENTO DE ESCUCHA PARA LAS LETRAS DEL JUEGO
lettersElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('letter')) {
        letterPressed(e.target.textContent)
        verifyLetterInWord(e.target.textContent)
    }
});
