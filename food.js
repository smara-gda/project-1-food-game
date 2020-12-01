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
  }
  runLogic() {
    this.y += this.speed;
  }
  drawFood() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.height, this.width);
    // context.drawImage(this.image, this.x, this.y.this.width, this.height);
  }
}
