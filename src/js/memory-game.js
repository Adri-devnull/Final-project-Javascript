
// TABLERO DEL JUEGO 
const gameBoardElement = document.getElementById('game-board');

// VARIABLES
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let attempts = 0;
let numberCell1 = '';
let numberCell2 = '';
let numbersCell = [];
// const movements = 0;
// const hits = 0;


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
        }
    }
    attempts++;
};

// FUNCION PARA COMPROBAR SI LOS NUMEROS SELECCIONADOS SON IGUALES O NO
const verifyChoosedNumbers = (num1, num2, cell) => {
    if (num1 !== num2) {
        console.log('distintos');
        setTimeout(() => {
            numbersCell.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('cell-clicked');
            });
            attempts = 0
        }, 1500)
    } else {
        console.log('Son iguales');
        cell.classList.add('cell-clicked');
        attempts = 0;
        numbersCell = [];
    }
}
