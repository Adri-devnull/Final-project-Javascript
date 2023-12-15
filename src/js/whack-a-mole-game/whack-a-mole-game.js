// ELEMENTO CONTENEDOR DEL JUEGO
const boardGameElement = document.getElementById('game-board');
// BOTON DE INICIO DEL JUEGO
const btnStartElement = document.getElementById('btn-start');
// ELEMENTO CONTENEDOR DE LOS PUNTOS DEL JUEGO
const pointsGameElement = document.getElementById('game-points');
// ELEMENTO CONTENEDOR DEL TIEMPO DEL JUEGO
const timeGameElement = document.getElementById('game-time');
// ELEMENTO CONTENEDOR DEL NIVEL DEL JUEGO
const levelGameElement = document.getElementById('game-level');
// BOTON RESTART DEL JUEGO
const btnRestartGameElement = document.getElementById('btn-restart');

// VARIABLES
const holes = 9;
let intervalId;
let intervalIdTime;
let counter = 40;
let points = 0;
let difficultyTime = 800;
let gameFinished = false;

// FUNCION PARA CREAR EL TABLERO DE JUEGO
const createGameBoard = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < holes; i++) {
        const hole = document.createElement('div');
        hole.dataset.id = i;
        hole.classList.add('hole');
        fragment.append(hole);
    }
    boardGameElement.append(fragment);
}

// LLAMADA A LA FUNCION PARA PINTAR EL TABLERO DE JUEGO
createGameBoard();

// FUNCION PARA GENERAR POSICION ALEATORIA
const randomPosition = () => {
    const randomPosition = Math.floor(Math.random() * holes);
    return randomPosition;
}

// FUNCION PARA PINTAR AL TOPO RANDOM
const setMole = () => {
    const position = randomPosition();
    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.classList.add(`position-${position}`);
    boardGameElement.append(mole);

    setTimeout(() => {
        mole.remove();
    }, 500);
}

// FUNCION PARA PINTAR LA BOMBA RANDOM
const setBomb = () => {
    const position = randomPosition();
    const bomb = document.createElement('div');
    bomb.classList.add('bomb');
    bomb.classList.add(`position-${position}`);
    boardGameElement.append(bomb);

    setTimeout(() => {
        bomb.remove();
    }, 500);
}

// FUNCION PARA COLOCAR EN EL TABLERO EL TOPO O LA BOMBA CADA X TIEMPO
const moveMoleorBombRandom = () => {
    if (intervalId) {
        return
    }
    intervalId = setInterval(() => {
        const randomMoleOrBomb = Math.random();
        console.log('hola');
        if (randomMoleOrBomb < 0.75) {
            setMole();
        } else {
            setBomb();
        }
    }, difficultyTime);
}

// FUNCION PARA SUMAR PUNTOS AL CLICAR AL MOLE
const whackaMole = (event) => {
    if (event.target.classList.contains('mole')) {
        points += 100;
        pointsGameElement.textContent = points;
        event.target.remove();
    }
}

// FUNCION PARA AUMENTAR EL NIVEL
const addLevel = (counter) => {
    if (counter === 30) {
        levelGameElement.textContent = 'LEVEL 2';
        levelGameElement.classList.add('white');
    } else if (counter === 20) {
        levelGameElement.textContent = 'LEVEL 3';
        levelGameElement.classList.remove('white');
        levelGameElement.classList.add('yellow');
    } else if (counter === 10) {
        levelGameElement.textContent = 'MAX LEVEL';
        levelGameElement.classList.remove('yellow');
        levelGameElement.classList.add('red');
    }
}

// FUNCION PARA CREAR EL CONTADOR DE TIEMPO
const countDown = () => {
    if (intervalIdTime) {
        return
    }
    intervalIdTime = setInterval(() => {
        if (counter === 0) {
            showWinPoints();
        }
        counter--
        let time;
        if (counter >= 0) {
            time = counter;
        } else {
            time = 0;
        }
        timeGameElement.textContent = `${time}s`;
        addLevel(counter)
    }, 1000);
}

// MOSTRAR PANTALLA DE QUE EL USUARIO HA CLICADO EN LA BOMBA
const showLose = () => {
    boardGameElement.textContent = '';
    boardGameElement.classList.add('show-lose');
    clearInterval(intervalId);
    clearInterval(intervalIdTime);
    gameFinished = true;
    btnStartElement.classList.add('hide');
    btnRestartGameElement.classList.remove('hide');
}

// MOSTRAR PANTALLA DE QUE EL USUARIO HA GANADO Y LOS PUNTOS QUE HA OBTENIDO
const showWinPoints = () => {
    if (gameFinished) {
        return
    }
    gameFinished = true;
    boardGameElement.textContent = '';
    boardGameElement.classList.add('column');
    const moleWin = document.createElement('div');
    moleWin.classList.add('show-win');
    const textWin = document.createElement('h2');
    textWin.textContent = `${points} POINTS`;
    textWin.classList.add('text-win');
    boardGameElement.append(moleWin);
    boardGameElement.append(textWin);
    clearInterval(intervalId);
    clearInterval(intervalIdTime);
    btnStartElement.classList.add('hide');
    btnRestartGameElement.classList.remove('hide');
}

// FUNCION PARA HACER EL RESTART GAME
const restartGame = () => {
    clearInterval(intervalId);
    clearInterval(intervalIdTime);
    intervalId = undefined;
    intervalIdTime = undefined;
    counter = 40;
    points = 0;
    gameFinished = false;
    difficultyTime = 800;
    boardGameElement.textContent = '';
    pointsGameElement.textContent = '0 pts';
    timeGameElement.textContent = '40s';
    levelGameElement.textContent = 'LEVEL 1';
    levelGameElement.classList.remove('white', 'yellow', 'red');
    boardGameElement.classList.remove('show-lose', 'column');
    createGameBoard();
    moveMoleorBombRandom();
    countDown();
}

// EVENTO DE ESCUCHA PARA REINICIAR EL JUEGO CLICANDO EN EL BOTON
btnRestartGameElement.addEventListener('click', () => {
    restartGame()
})

// EVENTO DE ESCUCHA PARA INICIAR EL JUEGO CLICANDO EN EL BOTON
btnStartElement.addEventListener('click', () => {
    moveMoleorBombRandom();
    countDown()
})

// EVENTO DE ESCUCHA PARA SABER CUANDO SE HA PINCHADO EN EL TABLERO DE JUEGO
boardGameElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('bomb')) {
        showLose();
    } else {
        whackaMole(event);
    }
})