const losePointsSound = new Audio('sounds/losing_points.mp3');
const eatSound = new Audio('sounds/human_eat_crunch_apple_002.mp3'); //sound from zapsplat.com
const gameOver = new Audio('sounds/game_over.mp3'); //sound from zapsplat.com
eatSound.playbackRate = 2.5;

class Game {
  constructor() {
    this.player = new Player(cnvWidth / 2, cnvHeight - 50, 50, 50);
    this.badFoods = [];
    this.goodFoods = [];
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
    this.badFoods = [];
    this.goodFoods = [];
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
      this.badFoods.push(new BadFood(0));
      this.lastBadFoodTimeStamp = currentTimeStamp;
    }
    if (currentTimeStamp > this.lastGoodFoodTimeStamp + 3000) {
      this.goodFoods.push(new GoodFood());
      this.lastGoodFoodTimeStamp = currentTimeStamp;
    }
  }

  removeFoods() {
    for (let badfood of this.badFoods) {
      if (
        // collision detection
        this.player.playerX < badfood.badFoodX + badfood.foodWidth / 2 &&
        this.player.playerX + this.player.playerWidth / 2 > badfood.badFoodX &&
        this.player.playerY < badfood.badFoodY + badfood.foodHeight &&
        this.player.playerY + this.player.playerHeight / 2 > badfood.badFoodY
      ) {
        const indexOfBadFood = this.badFoods.indexOf(badfood);
        this.badFoods.splice(indexOfBadFood, 1);
        this.score -= 10;
        const scoreElement = document.querySelector('.score span');
        scoreElement.innerText = ` ${this.score}`;
        losePointsSound.play();
      }
    }

    for (let goodfood of this.goodFoods) {
      if (
        // collision detection
        this.player.playerX < goodfood.goodFoodX + goodfood.foodWidth &&
        this.player.playerX + this.player.playerWidth > goodfood.goodFoodX &&
        this.player.playerY < goodfood.goodFoodY + goodfood.foodHeight &&
        this.player.playerY + this.player.playerHeight > goodfood.goodFoodY
      ) {
        const indexofGoodFood = this.goodFoods.indexOf(goodfood);
        this.goodFoods.splice(indexofGoodFood, 1);

        this.score += 10;
        const scoreElement = document.querySelector('.score span');
        scoreElement.innerText = ` ${this.score}`;
        eatSound.play();
      }
    }
  }
  // drawScore() {
  //   context.fillStyle = '#a9dd9e';
  //   context.font = '70px sans-serif';
  //   context.fillText(this.score, 550, 480);
  // }
  deleteFoodsOutOfCanvas() {
    for (let badfoodItem of this.badFoods) {
      if (badfoodItem.badFoodY >= cnvHeight) {
        const badFoodIndex = this.badFoods.indexOf(badfoodItem);
        this.badFoods.splice(badFoodIndex, 1);
      }
    }
    for (let goodfoodItem of this.goodFoods) {
      if (goodfoodItem.goodFoodY >= cnvHeight) {
        const goodFoodIndex = this.goodFoods.indexOf(goodfoodItem);
        this.goodFoods.splice(goodFoodIndex, 1);
      }
    }
  }

  // call runLogic method for every element in the game that has it
  runLogic() {
    this.deleteFoodsOutOfCanvas();
    this.rainingFoods();

    // run bad food runLogic method for each element in its array
    for (let badFood of this.badFoods) {
      badFood.runLogic();
    }
    // run good food runLogic method for each element in its array
    for (let goodFood of this.goodFoods) {
      goodFood.runLogic();
    }
    this.removeFoods();
    this.avoidGoingOutOfCanvas();
    if (this.score <= -10) {
      this.condition = false;
    }
  }

  // calling draw method for every food
  drawGoodAndBadFoods() {
    for (let badFood of this.badFoods) {
      badFood.drawBadFood();
    }
    for (let goodFood of this.goodFoods) {
      goodFood.drawGoodFood();
    }
  }
  // function that invokes all drawing functions in the game
  draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.player.draw();
    this.drawGoodAndBadFoods();
    // this.drawScore();
  }
}
