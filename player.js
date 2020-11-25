class Player {
  constructor() {
    this.playerHeight = 50;
    // make player Y position to always stick at the bottom of the canvas
    let newY = canvas.height - this.playerHeight;
    this.playerY = newY;
    this.playerX = width / 2;
    this.playerWidth = 50;
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
