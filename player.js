class Player {
  constructor(playerX, playerY, height, width) {
    this.playerHeight = height;
    this.playerY = playerY;
    this.playerX = playerX;
    this.playerWidth = width;
  }
  // draw the player
  draw() {
    context.fillStyle = '#f0f8f9';
    context.fillRect(
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
  }
}
// TODO add human image for player
