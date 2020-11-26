class Game {
  constructor() {
    this.player = new Player(cnvWidth / 2, cnvHeight - 50, 50, 50);
    this.badFoods = [new BadFood(cnvHeight)];
    this.goodFoods = [new GoodFood()];
    this.lastBadFoodTimeStamp = 0;
    this.lastGoodFoodTimeStamp = 0;
    this.setKeyListeners();
    // console.log(this.badFoods);
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
    if (currentTimeStamp > this.lastBadFoodTimeStamp + 2000) {
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
        badfood.badFoodY >= this.player.playerY - this.player.playerHeight &&
        badfood.badFoodX >= this.player.playerX - this.player.playerWidth
      ) {
        this.badFoods.splice(0, 1);
        // score -=10;
        // play sad sound;
      }
    }
    for (let goodfood of this.goodFoods) {
      if (
        goodfood.goodFoodY >= this.player.playerY - this.player.playerHeight &&
        goodfood.goodFoodX >= this.player.playerX - this.player.playerWidth
      ) {
        this.goodFoods.splice(0, 1);
        // score +=10;
        //play hppy sound;
      }
    }
  }

  // call runLogic method for every element in the game that has it
  runLogic() {
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
