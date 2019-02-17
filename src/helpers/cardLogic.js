const CardLogic = {
  ranks: [
    "A", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K"
  ],
  suits:{
    CLUBS:    "♣️",
    DIAMONDS: "♦️",
    HEARTS:   "♥️",
    SPADES:   "♠️"
  },
  isOneGreater: function (card, comparedTo) {
    const cardVal = this.ranks.indexOf(card.rank);
    const compVal = this.ranks.indexOf(comparedTo.rank);
    if(cardVal === -1 || compVal === -1) {
      throw new Error(`Invalid card rank: CardLogic.isOneGreater({rank: '${card.rank}'}, {rank: '${comparedTo.rank}'})`);
    }
    return (compVal + 1 === cardVal);
  },
  getSuitName: function (suit) {
    switch(suit) {
      case this.suits.CLUBS:
        return 'clubs';
      case this.suits.DIAMONDS:
        return 'diamonds';
      case this.suits.HEARTS:
        return 'hearts';
      case this.suits.SPADES:
        return 'spades';
      default:
        return "";
    }
  },
  // Durstenfeld shuffle in place
  shuffle: function (cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }
}
export default CardLogic;
