import Stack from './Stack';

const CARD_KH = { id: 'K♥️' };
const CARD_AH = { id: 'A♥️' };
const CARD_8S = { id: '8♠️' };
const CARD_6D = { id: '6♦️' };
const CARD_2C = { id: '2♣️' };
const CARD_7S = { id: '7♠️' };

let stack;

beforeEach(function () {
  stack = undefined;
})

describe('push', function () {
  it('adds the card to empty cards array', function () {
    stack = new Stack();
    stack.push(CARD_AH);

    expect(stack.cards.length).toEqual(1);
    expect(stack.cards[0]).toEqual(CARD_AH);
  })

  it('adds the card onto the end of existing cards array', function () {
    let cards = [CARD_6D, CARD_AH];
    stack = new Stack(cards);

    stack.push(CARD_KH);

    expect(stack.cards.length).toEqual(3);
    expect(stack.cards[0]).toEqual(CARD_6D);
    expect(stack.cards[1]).toEqual(CARD_AH);
    expect(stack.cards[2]).toEqual(CARD_KH);
  })
})

describe('peek', function () {
  it('returns undefined if cards is empty', function () {
    stack = new Stack();

    const returnVal = stack.peek();
    expect(returnVal).toEqual(undefined);
  })

  it('returns the card when cards has one card', function () {
    let cards = [CARD_2C];
    stack = new Stack(cards);

    const returnVal = stack.peek();
    expect(returnVal).toEqual(CARD_2C);
  })

  it('returns the last card when cards has several cards', function () {
    let cards = [CARD_2C, CARD_6D, CARD_8S];
    stack = new Stack(cards);

    const returnVal = stack.peek();
    expect(returnVal).toEqual(CARD_8S);
  })
})

describe('pop', function () {
  it('returns undefined if cards is empty', function () {
    stack = new Stack();

    const returnVal = stack.pop();
    expect(returnVal).toEqual(undefined);
  })

  it('removes the last card from the cards array', function () {
    let cards = [CARD_2C, CARD_8S];
    stack = new Stack(cards);

    const returnVal = stack.pop();
    expect(returnVal).toEqual(CARD_8S);
  })

  it('returns the last card from the cards array', function () {
    let cards = [CARD_2C, CARD_8S];
    stack = new Stack(cards);
    stack.pop();

    expect(stack.cards.length).toEqual(1);
    expect(stack.cards[0]).toEqual(CARD_2C);
  })

  it('can be called multiple times and is correctly updated', function () {
    let cards = [CARD_2C, CARD_8S, CARD_6D, CARD_KH, CARD_AH, CARD_7S];
    stack = new Stack(cards);

    const returnVal = stack.pop();
    expect(returnVal).toEqual(CARD_7S);
    expect(stack.cards.length).toEqual(5);
    expect(stack.cards[4]).toEqual(CARD_AH);

    const returnVal2 = stack.pop();
    expect(returnVal2).toEqual(CARD_AH);
    expect(stack.cards.length).toEqual(4);
    expect(stack.cards[3]).toEqual(CARD_KH);
  })
})

describe('isTopCard', function () {
  it('returns false if the given card is undefined', function () {
    let cards = [CARD_2C, CARD_8S];
    stack = new Stack(cards);

    const returnVal = stack.isTopCard(undefined);
    expect(returnVal).toEqual(false);
  })

  it('returns false if the cards array is empty', function () {
    stack = new Stack();

    const returnVal = stack.isTopCard({props: CARD_KH});
    expect(returnVal).toEqual(false);
  })

  it('returns false if the given card has a different value than the top card', function () {
    let cards = [CARD_2C, CARD_8S];
    stack = new Stack(cards);

    const returnVal = stack.isTopCard({props: CARD_AH});
    expect(returnVal).toEqual(false);
  })

  it('returns true if the given card has the same value as the top card', function () {
    let cards = [CARD_2C, CARD_8S];
    stack = new Stack(cards);

    const returnVal = stack.isTopCard({props: CARD_8S});
    expect(returnVal).toEqual(true);
  })
})

describe('removeCardById', function () {
  beforeEach(function () {
    let cards = [CARD_KH, CARD_8S, CARD_6D, CARD_2C, CARD_AH];
    stack = new Stack(cards);
  })
  describe('when id exists', function () {
    it('returns the card with given id', function () {
      const returnVal = stack.removeCardById(CARD_8S.id);
      expect(returnVal).toEqual(CARD_8S);
    })

    it('removes the card with the given id from the middle of the array', function () {
      stack.removeCardById(CARD_8S.id);
      const expected = [CARD_KH, CARD_6D, CARD_2C, CARD_AH];
      expect(stack.cards.length).toEqual(4);
      expect(stack.cards).toEqual(expected);
    })

    it('removes the card with the given id from the front of the array', function () {
      stack.removeCardById(CARD_KH.id);
      const expected = [CARD_8S, CARD_6D, CARD_2C, CARD_AH];
      expect(stack.cards.length).toEqual(4);
      expect(stack.cards).toEqual(expected);
    })

    it('removes the card with the given id from the end of the array', function () {
      stack.removeCardById(CARD_AH.id);
      const expected = [CARD_KH, CARD_8S, CARD_6D, CARD_2C];
      expect(stack.cards.length).toEqual(4);
      expect(stack.cards).toEqual(expected);
    })
  })

  describe('when id does not exist', function () {
    it('returns undefined', function () {
      const returnVal = stack.removeCardById(CARD_7S.id);
      expect(returnVal).toEqual(undefined);
    })

    it('does not alter cards array', function () {
      stack.removeCardById(CARD_7S.id);
      const expected = [CARD_KH, CARD_8S, CARD_6D, CARD_2C, CARD_AH];
      expect(stack.cards.length).toEqual(5);
      expect(stack.cards).toEqual(expected);
    })
  })
})
