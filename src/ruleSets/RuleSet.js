import CardLogic from 'helpers/cardLogic';
import { createDeck, createTableau, createFoundation, setStackCards } from 'redux/actions/stackActions';
import { moveCard } from 'redux/actions/cardActions';

// parent object with generic ruleset functions
// all functions are required - children should override all game-specific functions
// child constructor should call initialize() after it's finished overriding defaults
class RuleSet {
  constructor () {
    // some defaults
    this.tableauCount =  7;     // number of tableau piles
    this.foundationCount = 4;   // number of foundation piles
    this.deckProps = {};        // props to be passed to deck
    this.tableauProps = {};     // props to be passed to each tableau
    this.foundationProps = {};  // props to be passed to each foundation
  }

  initialize (dispatch, overrideCardFn) {
    this.createDeck(dispatch, overrideCardFn);
    this.createTableaus(dispatch);
    this.createFoundations(dispatch);
  }

  // generates a standard 52-card poker deck
  //   only need to override for mixed deck games like Spider
  //   --be sure to create unique card ids if overriding
  // accepts optional override function
  // returns array of cards: [{suit, rank, id}]
  generateCards () {
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

  createDeck (dispatch) {
    const id = "deck";
    const cards = this.generateCards();
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
