
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

// VARIABLES
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let attempts = 0;
let numberCell1 = '';
let numberCell2 = '';
let numbersCell = [];
let movements = 0;
let hits = 0;
let counter = 45;
let points = 0;

// FUNCION PARA LA CUENTA ATRAS DEL TIMER DEL JUEGO
const countDown = () => {
    const intervalId = setInterval(() => {
        if (counter === 0) {
            clearInterval(intervalId);
            gameTimeOut()
        } else {
            counter--
            countDownElement.textContent = counter;
        }
    }, 1000);
    console.log(counter);
};


// FUNCION PARA DESORDENAR EL ARRAY DE NUMEROS 
numbers.sort(() => { return Math.random() - 0.5 });

// FUNCION PARA PINTAR EL TABLERO DEL JUEGO
const createGameBoard = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numbers.length; i++) {
        const cell = document.createElement('div');
        cell.dataset.number = numbers[i];
        cell.classList.add('cell');
        fragment.append(cell)

        cell.addEventListener('click', (e) => {
            showNumberCell(cell, e)
        })
    }
    gameBoardElement.append(fragment);
}

// LLAMADA A FUNCION PARA PINTAR TABLERO DE JUEGO
createGameBoard()

// FUNCION PARA MOSTRAR NUMEROS DE LAS CELDAS
const showNumberCell = (cell, e) => {
    if (attempts < 2) {
        const clickedNumber = e.target.dataset.number;
        cell.textContent = clickedNumber;
        numbersCell.push(cell)
        if (attempts === 0) {
            numberCell1 = clickedNumber;
            cell.classList.add('cell-clicked')
        } else if (attempts === 1) {
            numberCell2 = clickedNumber;
            cell.classList.add('cell-clicked')
            verifyChoosedNumbers(numberCell1, numberCell2, cell)
            movements++
            movementsElement.textContent = movements;
        }
    }
    attempts++;
};

// FUNCION PARA COMPROBAR SI LOS NUMEROS SELECCIONADOS SON IGUALES O NO
const verifyChoosedNumbers = (num1, num2, cell) => {
    if (num1 !== num2) {
        setTimeout(() => {
            numbersCell.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('cell-clicked');
            });
            attempts = 0
        }, 1500)
    } else {
        cell.classList.add('cell-clicked');
        attempts -= 2;
        numbersCell = [];
        hits++
        hitsElement.textContent = hits;
        points++
        memoryCompleted(cell);
    }
}

// FUNCION PARA COMPROBAR SI HAS GANADO
const memoryCompleted = (cell) => {
    if (points === 8) {
        alert('Has ganado')
    }
}

// FUNCION PARA COMPROBAR SI SE HA ACABADO EL TIEMPO ANTES DE QUE COMPLETES EL JUEGO
const gameTimeOut = () => {
    if(counter === 0) {
        btnStartGameElement.classList.add('hide');
        btnRestartGameElement.classList.remove('hide');
    }
}

// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA Y EL COUNTDOWN
btnStartGameElement.addEventListener('click', () => {
    countDown();
})
