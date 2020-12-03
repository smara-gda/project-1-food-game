class Player {
  constructor(playerX, playerY, height, width) {
    this.playerHeight = height;
    this.playerY = playerY;
    this.playerX = playerX;
    this.playerWidth = width;
    this.image = new Image();
    this.image.src = 'player-sprites/girl-walk-1.png';
  }

  // playerImages = new Array(
  //   'player-sprites/Walk(1).png',
  //   'player-sprites/Walk(2).png',
  //   'player-sprites/Walk(3).png',
  //   'player-sprites/Walk(4).png',
  //   'player-sprites/Walk(5).png',
  //   'player-sprites/Walk(6).png',
  //   'player-sprites/Walk(7).png',
  //   'player-sprites/Walk(8).png',
  //   'player-sprites/Walk(9).png',
  //   'player-sprites/Walk(10).png',
  //   'player-sprites/Walk(11).png',
  //   'player-sprites/Walk(12).png'
  // );

  // draw the player
  // draw() {
  //   context.fillStyle = '#f0f8f9';
  //   context.fillRect(
  //     this.playerX,
  //     this.playerY,
  //     this.playerWidth,
  //     this.playerHeight
  //   );
  // }

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

// TODO add human image for player
