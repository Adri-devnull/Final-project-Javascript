import { minesCountElement, gameBoardElement, flagsButtonElement, timeElement, newGameButtonElement, restartGameButtonElement } from "./elements-dom";

// VARIABLES
let minesCount = 4;
const minesLocation = [];
const rows = 8;
const columns = 8;
const board = [];
let flagEnabled = false;
let gameOver = false;
let tilesCompleted = 0;
let time = 120;
let intervalId;
let gameStarted = false;

// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA
newGameButtonElement.addEventListener('click', () => {
    countDown();
    gameStarted = true;
})

// FUNCION PARA CREAR LA LOCALIZACION DE LAS MINAS
const setMines = () => {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        const rRandom = Math.floor(Math.random() * rows);
        const cRandom = Math.floor(Math.random() * columns);
        const mineLocation = rRandom.toString() + '-' + cRandom.toString();
        if (!minesLocation.includes(mineLocation)) {
            minesLocation.push(mineLocation);
            minesLeft -= 1
        }
    }
}

const clearMines = () => {
    minesLocation.length = 0;
}

// FUNCION PARA CREAR EL TABLERO DEL JUEGO
export const startGame = () => {
    setMines()
    minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement('div');
            tile.dataset.id = r.toString() + '-' + c.toString();
            tile.addEventListener('click', () => {
                clickTile(tile);
            })
            gameBoardElement.append(tile);
            row.push(tile);
        }
        board.push(row)
    }
}

// FUNCION PARA SABER SI EL BOTON DE LAS BANDERAS ESTA ACTIVADO
export const isFlagActived = () => {
    if (flagEnabled) {
        flagEnabled = false;
        flagsButtonElement.classList.remove('flag-clicked');
    } else {
        flagEnabled = true;
        flagsButtonElement.classList.add('flag-clicked');
    }
}

// FUNCION PARA REVELAR TODAS LAS MINAS CUANDO SE HA CLICADO UNA
const revealMines = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = board[c][r];
            if (minesLocation.includes(tile.dataset.id)) {
                tile.classList.add('bomb-clicked');
                tile.textContent = '💣';
            }
        }
    }
}

// FUNCION PARA CUANDO SE CLICA UNA DE LAS CELDAS PASEN DIFERENTES EVENTOS
const clickTile = (tile) => {
    if (gameStarted) {
        if (gameOver || tile.classList.contains('tile-clicked')) {
            return;
        }
        if (!tile.classList.contains('tile-clicked') && flagEnabled) {
            if (minesLocation.includes(tile.dataset.id)) {
                tile.textContent = '🚩';
                minesCount--;
                minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
            } else if (tile.textContent === '') {
                tile.textContent = '🚩';
                minesCount--;
                minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
            } else if (tile.textContent === '🚩') {
                tile.textContent = '';
                minesCount++;
                minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
            }
            return;
        }

        if (minesLocation.includes(tile.dataset.id)) {
            tile.classList.add('bomb-clicked');
            tile.textContent = '💣';
            gameOver = true;
            revealMines();
            showUserLose();
            return;
        }
        const coords = tile.dataset.id.split('-');
        const r = parseInt(coords[0]);
        const c = parseInt(coords[1]);
        checkMine(r, c);
    }
}

// COMPROBAR LAS MINAS DE ALREDEDOR QUE TENGLA CADA CELDA
const checkMine = (r, c) => {
    if (r < 0 || r > rows || c < 0 || c > columns) {
        return;
    }

    if (board[r][c].classList.contains('tile-clicked')) {
        return;
    }

    tilesCompleted += 1

    board[r][c].classList.add('tile-clicked');
    let minesFound = 0;

    // top 3
    minesFound += checkTile(r - 1, c - 1); // top left
    minesFound += checkTile(r - 1, c); // top
    minesFound += checkTile(r - 1, c + 1); // top right

    // middle 3
    minesFound += checkTile(r, c - 1); // middle left
    minesFound += checkTile(r, c + 1); // middle right

    // bottom 3
    minesFound += checkTile(r + 1, c - 1); // bottom left
    minesFound += checkTile(r + 1, c); // bottom
    minesFound += checkTile(r + 1, c + 1); // bottom right

    if (minesFound > 0) {
        board[r][c].textContent = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    } else {
        // top 3
        minesFound += checkMine(r - 1, c - 1); // top left
        minesFound += checkMine(r - 1, c); // top
        minesFound += checkMine(r - 1, c + 1); // top right

        // middle 3
        minesFound += checkMine(r, c - 1); // middle left
        minesFound += checkMine(r, c + 1); // middle right

        // bottom 3
        minesFound += checkMine(r + 1, c - 1); // bottom left
        minesFound += checkMine(r + 1, c); // bottom
        minesFound += checkMine(r + 1, c + 1); // bottom right
    }
    if (tilesCompleted === columns * rows - minesCount) {
        gameOver = true;
        showUserWinner();
    }
    console.log(minesCount);
}

// FUNCION PARA REVISAR SI HAY MINAS EN LAS CELDAS ADYACENTES A LA CLICADA
const checkTile = (r, c) => {
    if (r < 0 || r > rows || c < 0 || c > columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + '-' + c.toString())) {
        return 1;
    }
    return 0;
}

// FUNCION PARA INICIAR UNA CUENTA ATRAS DE TIEMPO
export const countDown = () => {
    if (intervalId) {
        return
    }
    intervalId = setInterval(() => {
        time--
        timeElement.textContent = `TIME LEFT: ${time}`;
        if (time === 0) {
            showUserLose()
        }
    }, 1000);
}

// FUNCION PARA MOSTRAR CUANDO EL USUARIO HA GANADO
const showUserWinner = () => {
    gameBoardElement.textContent = '';
    gameBoardElement.classList.remove('game__board');
    gameBoardElement.classList.add('game__board-win');
    const titleWin = document.createElement('h2');
    titleWin.textContent = 'MINES DISARMED';
    titleWin.classList.add('title-win');
    gameBoardElement.append(titleWin);
    restartGameButtonElement.classList.remove('hide');
    newGameButtonElement.classList.add('hide');
    stopTimer();
}

// FUNCION PARA MOSTRAR CUANDO EL USUARIO HA PERDIDO
const showUserLose = () => {
    gameBoardElement.textContent = '';
    gameBoardElement.classList.remove('game__board');
    gameBoardElement.classList.add('game__board-lose');
    const titleWin = document.createElement('h2');
    titleWin.textContent = '3,2,1...';
    titleWin.classList.add('title-win');
    gameBoardElement.append(titleWin);
    restartGameButtonElement.classList.remove('hide');
    newGameButtonElement.classList.add('hide');
    stopTimer();
}

// FUNCION PARA REINICIAR TODOS LOS STATS DE LA PARTIDA
export const restartGame = () => {
    gameBoardElement.classList.remove('game__board-lose');
    gameBoardElement.classList.remove('game__board-win');
    gameBoardElement.classList.add('game__board');
    gameBoardElement.textContent = '';
    restartGameButtonElement.classList.add('hide');
    board.length = 0;
    minesCount = 4;
    flagEnabled = false;
    gameOver = false;
    tilesCompleted = 0;
    gameStarted = true;
    time = 120;
    startGame();
    clearMines();
    setMines();
    countDown();
}
// FUNCION PARA DETENER EL CONTADOR
const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
    time = 120;
    timeElement.textContent = `TIME LEFT: ${time}`;
}