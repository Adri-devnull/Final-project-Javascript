import { countDownElement, gameBoardElement, movementsElement, hitsElement, btnStartGameElement, btnRestartGameElement, gameContainerElement, bannerLoseGameElement, bannerWinGameElement } from "./elements-dom";

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
let intervalId;
let btnStarted = false;

// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA Y EL COUNTDOWN
btnStartGameElement.addEventListener('click', () => {
    countDown();
    btnStarted = true;
})

// FUNCION PARA MOSTRAR ELEMENTO
const showElement = (elem) => {
    elem.classList.remove('hide');
}

// FUNCION PARA ESCONDER ELEMENTO
const hideElement = elem => {
    elem.classList.add('hide');
}

// FUNCION PARA LA CUENTA ATRAS DEL TIMER DEL JUEGO
export const countDown = () => {
    if (intervalId) {
        clearInterval(intervalId)
    }
    intervalId = setInterval(() => {
        if (counter === 0) {
            clearInterval(intervalId);
            showBannerLose()
        } else {
            counter--
            countDownElement.textContent = counter;
        }
    }, 1000);
};

// FUNCION PARA DESORDENAR EL ARRAY DE NUMEROS 
numbers.sort(() => { return Math.random() - 0.5 });

// FUNCION PARA PINTAR EL TABLERO DEL JUEGO
export const createGameBoard = () => {
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

// FUNCION PARA MOSTRAR NUMEROS DE LAS CELDAS
const showNumberCell = (cell, e) => {
    if (btnStarted) {
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
    }
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
        memoryCompleted();
    }
}

// FUNCION PARA COMPROBAR SI HAS GANADO
const memoryCompleted = () => {
    if (points === 8) {
        showBannerWin()
    }
}

// FUNCION PARA MOSTRAR EL BANNER SI HEMOS PERDIDO
const showBannerLose = () => {
    hideElement(btnStartGameElement);
    showElement(btnRestartGameElement)
    hideElement(gameContainerElement)
    showElement(bannerLoseGameElement);
}

// FUNCION PARA MOSTRAR EL BANNER SI HEMOS GANADO
const showBannerWin = () => {
    hideElement(gameContainerElement);
    showElement(bannerWinGameElement);
    hideElement(btnStartGameElement);
    showElement(btnRestartGameElement);
}

// FUNCION PARA RESETEAR EL JUEGO
export const restartGame = () => {
    showElement(gameContainerElement);
    hideElement(bannerWinGameElement);
    hideElement(bannerLoseGameElement);
    hideElement(btnStartGameElement);
    countDown();
    attempts = 0;
    numberCell1 = '';
    numberCell2 = '';
    numbersCell = [];
    movements = 0;
    hits = 0;
    counter = 45;
    points = 0;
    btnStarted = true;
    gameBoardElement.textContent = '';
    numbers.sort(() => { return Math.random() - 0.5 });
    createGameBoard()
    countDownElement.textContent = counter;
    hitsElement.textContent = hits;
    movementsElement.textContent = movements;
}