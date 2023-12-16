const memoryGameElement = document.getElementById('memory-game');
const hangmanGameElement = document.getElementById('hangman-game');
const minesweeperGameElement = document.getElementById('minesweeper-game');
const whackAmoleGameElement = document.getElementById('whack-a-mole-game');

memoryGameElement.addEventListener('click', () => {
    window.location.href = 'memory-game.html';
})

hangmanGameElement.addEventListener('click', () => {
    window.location.href = 'hangman-game.html';
})

minesweeperGameElement.addEventListener('click', () => {
    window.location.href = 'minesweeper-game.html';
})

whackAmoleGameElement.addEventListener('click', () => {
    window.location.href = 'whack-a-mole-game.html';
})