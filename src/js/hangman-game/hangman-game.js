// ELEMENTO CONTENEDOR DE LAS LETRAS DEL JUEGO
const lettersElement = document.getElementById('game-content-letters');



// VARIABLES
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const words = ['vampiro', 'puzzle', 'mesa', 'lechuza', 'magia'];

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
    return randomWord
}

// FUNCION PARA OBTENER EL VALOR DE LA TECLA QUE PRESIONA EL USUARIO
const letterPressed = (item) => {
    const letter = item;
    return letter
};

// EVENTO DE ESCUCHA PARA LAS LETRAS DEL JUEGO
lettersElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('letter')) {
        letterPressed(e.target.textContent)
    }
});
