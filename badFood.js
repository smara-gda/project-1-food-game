class BadFood {
  constructor(y) {
    this.foodWidth = 50;
    this.badFoodX = Math.floor(Math.random() * (width - this.foodWidth));
    this.foodHeight = 50;
    this.badFoodY = y;
  }
  runLogic() {
    this.badFoodY += 1.5;
  }
  drawBadFood() {
    context.fillStyle = '#80463e';
    context.fillRect(
      this.badFoodX,
      this.badFoodY,
      this.foodHeight,
      this.foodWidth
    );
  }
}
