const CardLogic = {
  ranks: {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
  },
  suits: {
    CLUBS: 'clubs',
    DIAMONDS: 'diamonds',
    HEARTS: 'hearts',
    SPADES: 'spades'
  },
  isOneGreater: function (card, comparedTo) {
    const cardVal = this.ranks[card.rank];
    const compVal = this.ranks[comparedTo.rank];
    if(cardVal === -1 || compVal === -1) {
      throw new Error(`Invalid card rank: CardLogic.isOneGreater({rank: '${card.rank}'}, {rank: '${comparedTo.rank}'})`);
    }
    return (compVal + 1 === cardVal);
  },
  getRankValue: function (rank) {
    if(this.ranks.hasOwnProperty(rank)) {
      return this.ranks[rank]
    }
    throw new Error(`Invalid card value: CardLogic.getRankValue(rank: '${rank}')`);
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
