class Game {
  constructor() {
    this.player = new Player(cnvWidth / 2, cnvHeight - 50, 50, 50);
    this.badFoods = [];
    this.goodFoods = [];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
    this.setKeyListeners();
    // this.condition = true;
  }
  // function to make the player move around on the screen
  setKeyListeners() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
          this.player.playerY -= 10;
          break;
        case 'ArrowDown':
          this.player.playerY += 10;
          break;
        case 'ArrowRight':
          this.player.playerX += 10;
          break;
        case 'ArrowLeft':
          this.player.playerX -= 10;
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
  // the game loop function, it keeps running all game functions on a loop
  loop() {
    this.runLogic();
    this.draw();

    window.requestAnimationFrame(() => {
      this.loop();
    });
  }

  rainingFoods() {
    const currentTimeStamp = Date.now();
    // make food items appear every 3 and 5 secs
    if (currentTimeStamp > this.lastBadFoodTimeStamp + 5000) {
      this.badFoods.push(new BadFood(0));
      this.lastBadFoodTimeStamp = currentTimeStamp;
    }
    if (currentTimeStamp > this.lastGoodFoodTimeStamp + 5000) {
      this.goodFoods.push(new GoodFood());
      this.lastGoodFoodTimeStamp = currentTimeStamp;
    }
  }

  removeFoods() {
    for (let badfood of this.badFoods) {
      if (
        badfood.badFoodY >= this.player.playerY &&
        badfood.badFoodY <= this.player.playerY + this.player.playerY &&
        badfood.badFoodX >= this.player.playerX &&
        badfood.badFoodX <= this.player.playerX + this.player.playerWidth
      ) {
        const indexOfBadFood = this.badFoods.indexOf(badfood);
        this.badFoods.splice(indexOfBadFood, 1);
        // score -=10;
        // play sad sound;
      }
    }

    for (let goodfood of this.goodFoods) {
      if (
        goodfood.goodFoodY >= this.player.playerY &&
        goodfood.goodFoodY <= this.player.playerY + this.player.playerY &&
        goodfood.goodFoodX >= this.player.playerX &&
        goodfood.goodFoodX <= this.player.playerX + this.player.playerWidth
      ) {
        const indexofGoodFood = this.goodFoods.indexOf(goodfood);
        this.goodFoods.splice(indexofGoodFood, 1);

        // score +=10;
        //play hppy sound;
      }
    }
  }

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
  }
}
