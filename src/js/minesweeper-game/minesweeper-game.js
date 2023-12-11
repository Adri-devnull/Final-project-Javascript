// ELEMENTO CONTENEDOR DEL TABLERO DEL JUEGO
const gameBoardElement = document.getElementById('game-board');
// ELEMENTO CONTENEDOR MINAS RESTANTES
const minesCountElement = document.getElementById('mines-span');
// BOTON DE PONER BANDERAS
const flagsButtonElement = document.getElementById('flag-btn');
// BOTON PARA COMENZAR LA PARTIDA
const newGameButtonElement = document.getElementById('newgame-btn');
// BOTON PARA REINICIAR LA PARTIDA
const restartGameButtonElement = document.getElementById('restartgame-btn');
// ELEMENTO SPAN DEL TIEMPO
const timeElement = document.getElementById('span-time');

// VARIABLES
let minesCount = 11;
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

// FUNCION PARA CREAR EL TABLERO DEL JUEGO
const startGame = () => {
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

// LLAMAMOS A LA FUNCION PARA CREAR EL TABLERO
startGame();

// FUNCION PARA SABER SI EL BOTON DE LAS BANDERAS ESTA ACTIVADO
const isFlagActived = () => {
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
        if (flagEnabled) {
            if (tile.textContent === '') {
                tile.textContent = '🚩';
                minesCount--
                minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
            } else if (tile.textContent === '🚩') {
                tile.textContent = '';
                minesCount++
                minesCountElement.textContent = `MINES LEFT: ${minesCount}`;
                return;
            }
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
    console.log(columns * rows - minesCount)
    console.log(tilesCompleted);
    if (tilesCompleted === columns * rows) {
        gameOver = true;
        showUserWinner();
    }
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
const countDown = () => {
    if (intervalId) {
        return
    }
    intervalId = setInterval(() => {
        time--
        timeElement.textContent = `TIME LEFT: ${time}`;
    }, 1000);
    if (time === 0) {
        clearInterval(intervalId)
        // poner contenido si el tiempo se le acaba al usuario
    }
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
const restartGame = () => {
    gameBoardElement.classList.remove('game__board-lose');
    gameBoardElement.classList.remove('game__board-win');
    gameBoardElement.classList.add('game__board');
    gameBoardElement.textContent = '';
    restartGameButtonElement.classList.add('hide');
    board.length = 0;
    minesCount = 7;
    flagEnabled = false;
    gameOver = false;
    tilesCompleted = 0;
    gameStarted = true;
    time = 120;
    startGame();
    countDown();
}
// FUNCION PARA DETENER EL CONTADOR
const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
    time = 120;
    timeElement.textContent = `TIME LEFT: ${time}`;
}
// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA
newGameButtonElement.addEventListener('click', () => {
    countDown();
    gameStarted = true;
})

// EVENTO DE ESCUCHA PARA REINICIAR LA PARTIDA
restartGameButtonElement.addEventListener('click', () => {
    restartGame();
})

// EVENTO DE ESCUCHA PARA EL BOTON DE PONER BANDERAS
flagsButtonElement.addEventListener('click', isFlagActived) 