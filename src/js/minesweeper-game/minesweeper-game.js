// ELEMENTO CONTENEDOR DEL TABLERO DEL JUEGO
const gameBoardElement = document.getElementById('game-board');
// ELEMENTO CONTENEDOR MINAS RESTANTES
const minesCountElement = document.getElementById('mines-span');
// BOTON DE PONER BANDERAS
const flagsButtonElement = document.getElementById('flag-btn');


// VARIABLES
const minesCount = 11;
const minesLocation = [];
const rows = 8;
const columns = 8;
const board = [];
let flagEnabled = false;
let gameOver = false;
let tilesCompleted = 0;

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

// FUNCION PARA CUANDO SE CLICA UNA DE LAS CELDAS
const clickTile = (tile) => {
    if (gameOver || tile.classList.contains('tile-clicked')) {
        return;
    }
    if (flagEnabled) {
        if (flagEnabled) {
            if (tile.textContent === '') {
                tile.textContent = '🚩';
            } else if (tile.textContent === '🚩') {
                tile.textContent = '';
            }
            return;
        }
    }

    if (minesLocation.includes(tile.dataset.id)) {
        tile.classList.add('bomb-clicked');
        tile.textContent = '💣';
        gameOver = true;
        revealMines();
        return; // Sale de 
    }

    const coords = tile.dataset.id.split('-');
    const r = parseInt(coords[0]);
    const c = parseInt(coords[1]);
    checkMine(r, c);
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
        alert('you win') // AQUI VA EL MENSAJE O EL BANNER DE CUANDO EL USUARIO LIMPIA TODAS LAS MINAS
    }
}

/// CHECKTILE FUNCTION
const checkTile = (r, c) => {
    if (r < 0 || r > rows || c < 0 || c > columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + '-' + c.toString())) {
        return 1;
    }
    return 0;
}

// EVENTO DE ESCUCHA PARA EL BOTON DE PONER BANDERAS
flagsButtonElement.addEventListener('click', isFlagActived)