class BadFood extends Food {
  constructor() {
    super();
    this.image.src = 'images/meat.png';
    this.speed = 2;
    this.color = '#80463e';
    this.impact = -10;
    this.vegx = 35;
    this.vegy = 40;
  }
}
