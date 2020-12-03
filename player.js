class Player {
  constructor(playerX, playerY, height, width) {
    this.playerHeight = height;
    this.playerY = playerY;
    this.playerX = playerX;
    this.playerWidth = width;
    this.image = new Image();
    this.image.src = 'player-sprites/girl-walk-1.png';
  }

  // playerImages = new Array();

  draw() {
    context.drawImage(
      this.image,
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
  }
}
