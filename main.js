const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');
const width = canvasElement.width;
const height = canvasElement.height;
// let playerY = height / 2;

// Player
class Player {
  constructor() {
    this.playerX = 75;
    this.playerY = 250;
    this.playerWidth = 30;
    this.playerHeight = 30;
  }
  drawPlayer() {
    context.fillStyle = 'blue';
    context.fillRect(
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
  }
}

// const player = new Player();

class GameLogic {
  constructor() {
    this.setKeyListeners();
    this.player = new Player();
  }

  //   add keylisteners to move the player around
  setKeyListeners() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      const key = event.key;
      switch (key) {
        case 'ArrowUp':
          this.player.playerY -= 10;
          console.log(this.player.playerY);
          break;
        case 'ArrowDown':
          this.player.playerY += 10;
          break;
      }
    });
  }
  runGame() {
    context.clearRect(this.playerX, this.playerY, width, height);
    this.player.drawPlayer();
    this.setKeyListeners();
  }
}

const startGame = new GameLogic();
startGame.runGame();
// Healthy food
// Unhealthy food

// Score
