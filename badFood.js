class BadFood extends Food {
  constructor() {
    super();
    this.image.src = [];
    this.speed = 2;
    this.color = '#80463e';
    this.impact = -10;
    this.foodX = 35;
    this.foodY = 40;
    this.randomBadFoods();
  }

  allImages = new Array(
    'images/meat.png',
    'images/salami.png',
    'images/badmeat.png',
    'images/steak.png'
  );
  randomBadFoods() {
    let randomNo = Math.floor(Math.random() * this.allImages.length);
    this.image.src = this.allImages[randomNo];
  }
}
