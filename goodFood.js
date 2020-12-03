class GoodFood extends Food {
  constructor() {
    super();
    this.image.src = [];
    this.speed = 1;
    this.impact = 10;
    this.color = '#74c9bf';
    this.foodX = 30;
    this.foodY = 40;
    this.randomFoods();
  }

  allImages = new Array(
    'images/brocolli.png',
    'images/tomato.png',
    'images/avocado.png',
    'images/mushrooms.png',
    'images/apple.png'
  );
  randomFoods() {
    let randomNo = Math.floor(Math.random() * this.allImages.length);
    this.image.src = this.allImages[randomNo];
  }
}
