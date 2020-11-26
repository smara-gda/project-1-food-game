class GoodFood {
  constructor() {
    this.foodWidth = 50;
    // position of food item is random
    this.goodFoodX = Math.floor(Math.random() * (cnvWidth - this.foodWidth));
    this.goodFoodY = 0;
    this.foodHeight = 50;
  }
  runLogic() {
    this.goodFoodY += 1;
  }
  drawGoodFood() {
    context.fillStyle = '#74c9bf';
    context.fillRect(
      this.goodFoodX,
      this.goodFoodY,
      this.foodHeight,
      this.foodWidth
    );
  }
}
