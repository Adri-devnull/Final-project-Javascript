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


// VARIABLES
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const words = ['vampiro', 'puzzle', 'mesa', 'lechuza', 'magia', 'mono', 'ojo', 'varita', 'hechizo', 'gafas'];
let fails = 5;
let correctLetters = 0;

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
    let found = false;
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
            wordElements[i].classList.add('show-letter');
            found = true;
            correctLetters++
        }
    }
    if (correctLetters === randomWord.length) {
        console.log('CORRECTO'); // aqui tiene que venir la funcion para cuando el usuario haya completado la palabra
    } else if (!found && fails > 0) {
        fails--
        decreaseLife();
        showWrongLetter(letter)
    }
}

// FUNCION QUE QUITA UNA VIDA SI LA LETRA NO SE ENCUENTRA EN LA PALABRA
const decreaseLife = () => {
    const lifes = lifesElement.querySelectorAll('.lifes');
    const lastIndex = lifes.length - 1;
    if (lastIndex >= 0) {
        const lastLife = lifes[lastIndex];
        lastLife.remove();
    } // aqui tiene que venir la funcion para cuando haya perdido todas las vidas que muestre game over
};

// FUNCION QUE MUESTRA LA LETRA ERRONEA ELEGIDA POR EL USUARIO
const showWrongLetter = (letter) => {
    const wrongLetter = document.createElement('span');
    wrongLetter.textContent = letter;
    wrongLetter.classList.add('wrong-letter');
    failsElement.append(wrongLetter);
}

// FUNCION PARA MOSTRAR EL BANNER DE LOSE CUANDO EL USUARIO NO COMPLETA LA PALABRA
const showBannerWin = () => {
    imageHangmanElement.classList.remove('game__image');
    imageHangmanElement.classList.add('game__image-lose');
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'RESTART GAME';
    restartBtn.classList.add('btn-restart');
    btnRestartContainerElement.append(restartBtn);
}

// EVENTO DE ESCUCHA PARA LAS LETRAS DEL JUEGO
lettersElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('letter')) {
        letterPressed(e.target.textContent)
        verifyLetterInWord(e.target.textContent)
        showBannerWin()
    }
});
