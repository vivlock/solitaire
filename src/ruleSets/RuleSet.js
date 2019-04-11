import CardLogic from 'helpers/cardLogic';
import { cardFunctions } from 'redux/actions/cardActions';
import { finishedInitializing } from 'redux/actions/appActions';

// parent object with generic ruleset functions
// all functions are required - children should override all game-specific functions
// child constructor should call initialize() after it's finished overriding defaults
class RuleSet {
  constructor () {
    // some defaults
    this.tableauCount =  7;     // number of tableau piles
    this.foundationCount = 4;   // number of foundation piles
    this.deckProps = {          // props to be passed to deck
      redeals: 3,            // # of times we can redeal the deck -- -1 is unlimited redeals
      stock: 3,              // # of cards to keep in the stock -- 0 is no stock mechanic
    };
    this.tableauProps = {};     // props to be passed to each tableau
    this.foundationProps = {};  // props to be passed to each foundation
  }

  initialize (dispatch) {
    this.createDeck(dispatch);
    this.createTableaus(dispatch);
    this.createFoundations(dispatch);
    dispatch(finishedInitializing());
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
      dispatch(cardFunctions.createTableau(id, { id: id, ...this.tableauProps }));
    }
  }

  createFoundations (dispatch) {
    for (let i = 0; i < this.foundationCount; i++) {
      const id = 'fdtn-' + i;
      dispatch(cardFunctions.createFoundation(id, { id: id, ...this.foundationProps }));
    }
  }

  createDeck (dispatch) {
    const id = "deck";
    const cards = this.generateCards();
    const shuffledCards = CardLogic.shuffle(cards);
    dispatch(cardFunctions.createDeck(id, { id: id, ...this.deckProps }, shuffledCards));
  }

  handleMoveCard (dispatch, card, fromId, toId) {
    dispatch(cardFunctions.moveCard(card, fromId, toId));
  }

  handleShuffle (dispatch, stackId, cards) {
    if(cards !== undefined) {
      const shuffled = CardLogic.shuffle(cards);
      dispatch(cardFunctions.setStackCards(stackId, shuffled));
    }
  }
}

export default RuleSet;
