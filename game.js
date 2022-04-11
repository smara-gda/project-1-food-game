const missedFood = new Audio('sounds/missedFoodNegativeSound.mp3');
const losePointsSound = new Audio('sounds/lost_points.mp3');
const eatSound = new Audio('sounds/human_eat_crunch_apple_002.mp3'); //sound from zapsplat.com
const gameOver = new Audio('sounds/game_over.mp3'); //sound from zapsplat.com
eatSound.playbackRate = 2.5;
eatSound.volume = 0.5;
losePointsSound.volume = 0.3;
gameOver.volume = 0.6;

class Game {
  constructor() {
    this.player = new Player(cnvWidth / 2, cnvHeight - 50, 40, 40);
    this.foods = [];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
    this.intervalBetweenFoods = 1500;
    this.setKeyListeners();
    this.score = 50;
    this.condition = true;
    this.lives = 3;
    this.badFood = new BadFood();
  }
  // function to make the player move around on the screen
  setKeyListeners() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
          this.player.playerY -= 30;
          break;
        case 'ArrowDown':
          this.player.playerY += 30;
          break;
        case 'ArrowRight':
          this.player.playerX += 30;
          break;
        case 'ArrowLeft':
          this.player.playerX -= 30;
          break;
      }
    });
  }

  // setting border so player does not move out of canvas
  avoidGoingOutOfCanvas() {
    this.player.playerX = Math.max(
      Math.min(this.player.playerX, cnvWidth - this.player.playerWidth),
      0,
    );
    this.player.playerY = Math.max(
      Math.min(this.player.playerY, cnvHeight - this.player.playerHeight),
      0,
    );
  }

  gameOver() {
    // gamingScreen.style.display = 'none';
    gameOverSection.style.display = 'block';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
  resetGame() {
    this.score = 0;
    this.foods = [];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
    this.intervalBetweenFoods = 1500;
    this.lives = 3;
    this.condition = true;
  }

  // the game loop function, it keeps running all game functions on a loop
  loop() {
    this.runLogic();
    this.draw();
    if (this.condition) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      gameOver.play();
      this.gameOver();
      this.player.hidePlayer(cnvHeight, cnvWidth);
      this.player.drawDeadPlayer();
    }
  }

  rainingFoods() {
    const currentTimeStamp = Date.now();
    // make food items appear every 3 and 5 secs
    if (
      currentTimeStamp >
      this.lastBadFoodTimeStamp + this.intervalBetweenFoods
    ) {
      this.foods.push(new BadFood());
      this.lastBadFoodTimeStamp = currentTimeStamp;
    }
    if (
      currentTimeStamp >
      this.lastGoodFoodTimeStamp + this.intervalBetweenFoods + 500
    ) {
      this.foods.push(new GoodFood());
      this.lastGoodFoodTimeStamp = currentTimeStamp;
    }
  }
  updateScore() {
    const scoreElement = document.querySelector('.score span');
    scoreElement.innerText = ` ${this.score}`;
  }
  updateLives() {
    const livesElement = document.querySelector('.lives span');
    livesElement.innerText = `${this.lives}`;
  }

  removeFoods() {
    for (let food of this.foods) {
      if (
        // collision detection
        this.player.playerX < food.x + food.width &&
        this.player.playerX + this.player.playerWidth > food.x &&
        this.player.playerY < food.y + food.height &&
        this.player.playerY + this.player.playerHeight > food.y
      ) {
        const indexOfFood = this.foods.indexOf(food);
        this.foods.splice(indexOfFood, 1);

        let score = this.score;
        this.score += food.impact;
        if (score < this.score) {
          eatSound.play();
        } else {
          this.lives--;
          losePointsSound.play();
          this.updateLives();
        }
      }
      this.updateScore();
    }
  }

  deleteFoodsOutOfCanvas() {
    for (let food of this.foods) {
      if (food.y >= cnvHeight) {
        const foodIndex = this.foods.indexOf(food);
        this.foods.splice(foodIndex, 1);
      }
    }
  }

  dontMissGoodFood() {
    for (let food of this.foods) {
      if (food.y >= cnvHeight && food.impact === 10) {
        missedFood.play();
        this.score = this.score - 30;
      }
      this.updateScore();
    }
  }

  // call runLogic method for every element in the game that has it
  runLogic() {
    this.intervalBetweenFoods *= 0.9999;
    this.badFood.speed *= 1.005;
    this.dontMissGoodFood();
    this.deleteFoodsOutOfCanvas();
    this.rainingFoods();

    // run bad food runLogic method for each element in its array
    for (let food of this.foods) {
      food.runLogic();
    }

    this.removeFoods();
    this.avoidGoingOutOfCanvas();
    if (!this.lives) {
      this.condition = false;
    }
  }

  // calling draw method for every food
  drawGoodAndBadFoods() {
    for (let food of this.foods) {
      food.drawFood();
    }
  }
  // function that invokes all drawing functions in the game

  draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.player.draw();
    this.drawGoodAndBadFoods();
    // this.player.drawDeadPlayer();
  }
}
