import React, { Component } from 'react';
import RuleSet from 'helpers/RuleSet';
import CardLogic from 'helpers/cardLogic';
import Deck from 'containers/Deck';
import Foundation from 'containers/Foundation';
import Tableau from 'containers/Tableau';
import { finishedInitializing } from 'redux/actions/appActions';
import { updateStacks } from 'redux/actions/stackActions';

// https://politaire.com/help/labellelucie
// actually this is la belle lucie with a draw, it's more fun
// but la belle lucie is a better name than
// https://politaire.com/help/threeshufflesandadraw
export default class LaBelleLucieDisplay extends Component {
  constructor (props) {
    super (props)

    const tableauCount = 18;
    const foundationCount = 4;
    const tableauProps = { display: 'horizontal' };
    const foundationProps = {};
    const deckProps = { redeals: 2, stock: false, stockDraw: false };

    this.ruleSet = new RuleSet({ tableauCount, foundationCount, tableauProps, foundationProps, deckProps });
    this.ruleSet.initialize(props.dispatch);
  }

  componentDidMount() {
    this.startGame();
  }

  startGame () {
    console.log('startGame', this.props);

    const deckId = this.props.deck.stackId;
    const deckCards = this.props.stacksById[deckId];
    const dispatch = this.props.dispatch;

    this.ruleSet.handleShuffle(dispatch, deckId, deckCards);
    //this.deal();
  }

  deal () {
    const { tableaus, deck, stacksById, dispatch } = this.props;
    const cards = stacksById[deck.stackId];
    const tableauCount = tableaus.length;

    console.log('deal tableaus', tableaus);
    console.log('deal deck', deck);
    console.log('deal cards', cards);

    let stacks = { [deck.stackId]: [] };
    for(let i = 0; i < tableauCount; i++ ) {
      stacks[tableaus[i].stackId] = [];
    }

    const length = cards.length - 1;
    for(let i = 0; i < length; i++) {
      stacks[tableaus[i % tableauCount].stackId].push(cards[i]);
    }

    console.log('after deal', stacks);

    dispatch(updateStacks(stacks))
  }

  handleClickDeck () {
    // // collect all cards from tableaus, shuffle and redeal
    // const { tableaus, deck } = this.state;
    // for (let tableau of tableaus) {
    //   deck.stack.push()
    // }
  }

  canMoveOntoTableau (card, stackId) {
    const tableauCards = this.props.stacksById[stackId]

    // cannot move onto empty tableau
    if (tableauCards.length !== 0) {
      // can move if card is same suit as top card, one lower rank than top card
      const topCard = tableauCards[-1];
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(topCard, card)) {
          return true;
        }
      }
    }
    return false;
  }

  canMoveOntoFoundation (card, stackId) {
    const foundationCards = this.props.stacksById[stackId];

    // if foundation is empty, can move if card is A
    if (foundationCards.length !== 0) {
      if (card.rank === 'A') {
        return true
      }
    }
    else {
      // can move if card is same suit as top card, and one greater rank
      const topCard = foundationCards[-1];
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(card, topCard)) {
          return true;
        }
      }
    }
    return false;
  }

  canDragFoundationCard (card, stackId) {
    return false;
  }

  canDragTableauCard (card, stackId) {
    // if card is top card
    const tableauCards = this.props.stacksById[stackId];
    if (tableauCards[-1].id === card.id) {
      return true;
    }
    return false;
  }

  render () {
    const { tableaus, foundations, deck, unicodeMode } = this.props;
    return (
      <div className={`gameboard ${unicodeMode ? 'unicode-mode' : ''}`}>
        <Deck {...deck.props} />
        <div className='foundation-container'>
          <div className='foundation-col'>
            {
              foundations.map((f, i) => (
                <Foundation key={ f.stackId }
                  canMoveOnto={ this.canMoveOntoFoundation.bind(this) }
                  //handleMoveOnto={ this.handleMoveOntoFoundation.bind(this) }
                  //removeCard={ this.handleRemoveFoundationCard.bind(this) }
                  canDragCard={ this.canDragFoundationCard.bind(this) }
                  { ...f.props }
                />
              ))
            }
          </div>
        </div>
        <div className='tableau-container'>
          {
            tableaus.map((t) => (
              <Tableau key={ t.stackId }
                canMoveOnto={ this.canMoveOntoTableau.bind(this) }
                //handleMoveOnto={ this.handleMoveOntoTableau.bind(this) }
                //removeCard={ this.handleRemoveTableauCard.bind(this) }
                canDragCard={ this.canDragTableauCard.bind(this) }
                { ...t.props }
              />
            ))
          }
        </div>
      </div>
    )
  }

}
