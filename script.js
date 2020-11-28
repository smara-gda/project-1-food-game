const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const cnvWidth = canvas.width;
const cnvHeight = canvas.height;

const game = new Game();
// game.loop();

const startElement = document.getElementById('trigger-game');
const replayElement = document.getElementById('trigger-replay');

const startingSection = document.getElementById('start');
const gameOverSection = document.getElementById('game-over');
const gamingScreen = document.getElementById('game-screen');

startElement.addEventListener('click', () => {
  gamingScreen.style.display = 'block';
  startingSection.style.display = 'none';
  startElement.style.display = 'none';
  game.loop();
});

replayElement.addEventListener('click', () => {
  gameOverSection.style.display = 'none';
  gamingScreen.style.display = 'block';
  game.condition = true;
  game.resetGame();
  game.loop();
});

/* TODO: 
-score - DONE
-lose points when touching bad food - DONE
-gain points when touching good food - DONE
-erase foods from the array when touching them or when they are out of the canvas. DONE!
- add sounds
- add icons
-Maybe have lives, if you eat bad food 3 times, you die, game over? 
*/
