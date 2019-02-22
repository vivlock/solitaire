class Theme {
  // TODO: actually expand on and use this
  constructor(bgColor, cardFrontColor, cardBack) {
    this.bgColor = bgColor;
    this.cardFront = cardFrontColor;
    this.cardBack = cardBack;
  }
  bgColor() {
    return this.bgColor;
  }
  cardFront() {
    return this.cardFront;
  }
  cardBack() {
    return this.cardBack;
  }
};

const Themes = {
  'bright': new Theme('white', 'white', 'default'),
  'dark':   new Theme('black', 'white', 'default')
};

export default Themes;
