
const memoryGameElement = document.getElementById('memory-game');
const hangmanGameElement = document.getElementById('hangman-game');

memoryGameElement.addEventListener('click', () => {
    window.location.href = 'memory-game.html';
})

hangmanGameElement.addEventListener('click', ()=> {
    window.location.href = 'hangman-game.html';
})