const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const cnvWidth = canvas.width;
const cnvHeight = canvas.height;

const game = new Game();
game.loop();

/* TODO: 
-score, 
-lose points when touching bad food,
-gain points when touching good food, 
-erase foods from the array when touching them or when they are out of the canvas. DONE (with bugs :( ))
-Maybe have lives, if you eat bad food 3 times, you die, game over? 
*/
