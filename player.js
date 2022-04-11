playerImages = new Array(
  'player-sprites/girl-run-1.png',
  'player-sprites/girl-run-2.png',
  'player-sprites/girl-run-3.png',
  'player-sprites/girl-run-4.png',
  'player-sprites/girl-run-5.png',
  'player-sprites/girl-run-6.png',
  'player-sprites/girl-run-7.png',
  'player-sprites/girl-run-8.png',
  'player-sprites/girl-run-9.png',
  'player-sprites/girl-run-10.png',
  'player-sprites/girl-run-11.png',
  'player-sprites/girl-run-12.png',
  'player-sprites/girl-run-13.png',
  'player-sprites/girl-run-14.png',
  'player-sprites/girl-run-15.png',
  'player-sprites/girl-run-16.png',
  'player-sprites/girl-run-17.png',
  'player-sprites/girl-run-18.png',
  'player-sprites/girl-run-19.png',
  'player-sprites/girl-run-20.png',
);
class Player {
  constructor(playerX, playerY, height, width) {
    this.playerHeight = height;
    this.playerY = playerY;
    this.playerX = playerX;
    this.playerWidth = width;
    this.image = new Image();
    this.deadImage = new Image();

    this.deadImage.src = 'player-sprites/girl-dead-30.png';
    this.image.src = playerImages[0];
    this.imageTimeStamp = 0;
    this.srcIndex = 0;
  }

  draw() {
    if (Date.now() > this.imageTimeStamp + 200) {
      this.srcIndex++;
      this.srcIndex = this.srcIndex % 4;
      this.image.src = playerImages[this.srcIndex];
      this.imageTimeStamp = Date.now();
    }
    context.drawImage(
      this.image,
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight,
    );
  }

  drawDeadPlayer() {
    context.drawImage(
      this.deadImage,
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight,
    );
  }
  hidePlayer(canvasHeight, canvasWidth) {
    context.clearRect(this.playerX, this.playerY, canvasHeight, canvasWidth);
  }
}
