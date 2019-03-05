export default class Stack {
  constructor(cards) {
    this.cards = (cards === undefined) ? [] : cards;
  }

  isEmpty() {
    return this.cards.length === 0;
  }

  push (card) {
    this.cards = this.cards.concat(card);
  }

  peek () {
    const length = this.cards.length;
    if (length === 0) {
      return undefined;
    }
    else {
      return this.cards[length - 1];
    }
  }

  pop () {
    const length = this.cards.length;
    if (length > 0) {
      const newCards = this.cards.slice(0, -1);
      const topCard = this.cards[length - 1];
      this.cards = newCards;
      return topCard;
    }
    return undefined;
  }

  removeCardById (cardId) {
    const index = this.cards.findIndex(function(card) {
      return card.id === cardId;
    });
    if (this.cards.length > index) {
      const card = this.cards[index];

      let front = [];
      if(index > 0) {
        front = this.cards.slice(0, index);
      }
      let back = [];
      if(index < this.cards.length - 1) {
        back = this.cards.slice(index + 1);
      }
      this.cards = front.concat(back);
      return card;
    }
    return undefined;
  }
}
