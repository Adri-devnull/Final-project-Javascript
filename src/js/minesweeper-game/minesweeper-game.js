// ELEMENTO CONTENEDOR DEL TABLERO DEL JUEGO
const gameBoardElement = document.getElementById('game-board');
// ELEMENTO CONTENEDOR MINAS RESTANTES
const minesCountElement = document.getElementById('mines-span');
// BOTON DE PONER BANDERAS
const flagsButtonElement = document.getElementById('flag-btn');


// VARIABLES
const minesCount = 6;
const minesLocation = [];
const rows = 8;
const columns = 8;
const board = [];
let flagEnabled = false;
// let gameOver = false;


// FUNCION PARA CREAR LA LOCALIZACION DE LAS MINAS
const setMines = () => {
    minesLocation.push('2-2');
    minesLocation.push('0-2');
    minesLocation.push('3-1');
    minesLocation.push('5-5');
    minesLocation.push('3-2');
    minesLocation.push('4-6');
}

// FUNCION PARA CREAR EL TABLERO DEL JUEGO
const startGame = () => {
    setMines()
    minesCountElement.textContent = `Mines left: ${minesCount}`;
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
    console.log(board);
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
            if (minesLocation.includes(tile.dataset.id)){
                tile.textContent = '💣';
                tile.classList.add('bomb-clicked');
            }
        }
    }
}

// FUNCION PARA PONER BANDERAS EN LAS CELDAS
const clickTile = (tile) => {
    if (flagEnabled) {
        if (tile.textContent === '') {
            tile.textContent = '🚩';
        } else if (tile.textContent === '🚩') {
            tile.textContent = '';
        }
    }

    if (minesLocation.includes(tile.dataset.id)) {
        console.log('BOOM');
        gameOver = true; // aqui terminaria el juego porque se ha clicado en una bomba
        revealMines();
    }
}

// EVENTO DE ESCUCHA PARA EL BOTON DE PONER BANDERAS
flagsButtonElement.addEventListener('click', isFlagActived)