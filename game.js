const losePointsSound = new Audio('sounds/losing_points.mp3');
const eatSound = new Audio('sounds/human_eat_crunch_apple_002.mp3'); //sound from zapsplat.com
const gameOver = new Audio('sounds/game_over.mp3'); //sound from zapsplat.com
eatSound.playbackRate = 2.5;

class Game {
  constructor() {
    this.player = new Player(cnvWidth / 2, cnvHeight - 50, 30, 30);

    this.foods = [];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
    this.setKeyListeners();
    this.score = 0;
    this.condition = true;
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
      0
    );
    this.player.playerY = Math.max(
      Math.min(this.player.playerY, cnvHeight - this.player.playerHeight),
      0
    );
  }

  gameOver() {
    gamingScreen.style.display = 'none';
    gameOverSection.style.display = 'block';
  }
  resetGame() {
    this.score = 0;
    this.foods = [];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
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
    }
  }

  rainingFoods() {
    const currentTimeStamp = Date.now();
    // make food items appear every 3 and 5 secs
    if (currentTimeStamp > this.lastBadFoodTimeStamp + 1000) {
      this.foods.push(new BadFood());
      this.lastBadFoodTimeStamp = currentTimeStamp;
    }
    if (currentTimeStamp > this.lastGoodFoodTimeStamp + 3000) {
      this.foods.push(new GoodFood());
      this.lastGoodFoodTimeStamp = currentTimeStamp;
    }
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
          losePointsSound.play();
        }
        const scoreElement = document.querySelector('.score span');
        scoreElement.innerText = ` ${this.score}`;
      }
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

  // call runLogic method for every element in the game that has it
  runLogic() {
    this.deleteFoodsOutOfCanvas();
    this.rainingFoods();

    // run bad food runLogic method for each element in its array
    for (let food of this.foods) {
      food.runLogic();
    }

    this.removeFoods();
    this.avoidGoingOutOfCanvas();
    if (this.score <= -10) {
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
  }
}
