import CardLogic from 'helpers/cardLogic';
import { createDeck, createTableau, createFoundation, setStackCards } from 'redux/actions/stackActions';
import { moveCard } from 'redux/actions/cardActions';

class RuleSet {
  constructor ({ tableauCount, foundationCount, tableauProps, foundationProps, deckProps }) {
    this.tableauCount = (tableauCount === undefined) ? 7 : tableauCount;            // number of tableau piles
    this.foundationCount = (foundationCount === undefined) ? 4 : foundationCount;   // number of foundation piles
    this.deckProps = (deckProps === undefined) ? {} : deckProps;                    // props to be passed to deck
    this.tableauProps = (tableauProps === undefined) ? {} : tableauProps;           // props to be passed to tableaus
    this.foundationProps = (foundationProps === undefined) ? {} : foundationProps;  // props to be passed to foundations
  }

  initialize (dispatch, overrideCardFn) {
    this.createDeck(dispatch, overrideCardFn);
    this.createTableaus(dispatch);
    this.createFoundations(dispatch);
  }

  // by default, generates a standard 52-card poker deck
  //   only need to pass override for mixed deck games like Spider
  //   --be sure to create unique card ids if overriding
  // accepts optional override function
  // returns array of cards: [{suit, rank, id}]
  generateCards (overrideFn) {
    if(typeof overrideFn === 'function') {
      return overrideFn();
    }

    const cards = [];
    for(let rank in CardLogic.ranks) {
      for(let suit in CardLogic.suits) {
        cards.push({ suit: CardLogic.suits[suit], rank: rank, id: `card-${rank}-${suit}` });
      }
    }
    return cards;
  }

  createTableaus (dispatch) {
    for (let i = 0; i < this.tableauCount; i++) {
      const id = 'tbl-' + i;
      dispatch(createTableau(id, { id: id, ...this.tableauProps }));
    }
  }

  createFoundations (dispatch) {
    for (let i = 0; i < this.foundationCount; i++) {
      const id = 'fdtn-' + i;
      dispatch(createFoundation(id, { id: id, ...this.foundationProps }));
    }
  }

  createDeck (dispatch, overrideCardFn) {
    const id = "deck";
    const cards = this.generateCards(overrideCardFn);
    dispatch(createDeck(id, { id: id, ...this.deckProps }, cards));
  }

  handleMoveCard (dispatch, card, fromId, toId) {
    dispatch(moveCard(card, fromId, toId));
  }

  handleShuffle (dispatch, stackId, cards) {
    if(cards !== undefined) {
      let shuffled = CardLogic.shuffle(cards);
      dispatch(setStackCards(stackId, shuffled));
    }
  }
}

export default RuleSet;
