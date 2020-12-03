class Food {
  constructor() {
    this.width = 50;
    // position of food item is random
    this.x = Math.floor(Math.random() * (cnvWidth - this.width));
    this.y = 0;
    this.height = 50;
    this.speed = 1;
    this.color = null;
    this.image = new Image();
    this.speed = 1;
  }
  runLogic() {
    this.y += this.speed;
  }

  drawFood() {
    context.drawImage(
      this.image,
      1.7,
      -5,
      this.foodX,
      this.foodY,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
