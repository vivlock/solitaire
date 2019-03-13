import React from 'React';

import Tableau from 'containers/Tableau';
import Foundation from 'containers/Foundation';
import Deck from 'containers/Deck';

import RuleSet from 'ruleSets/RuleSet'
import CardLogic from 'helpers';

import { updateStacks } from 'redux/actions/stackActions';

export class LaBelleLucie extends RuleSet {
  constructor (props) {
    super(props);

    this.tableauCount = 18;
    this.foundationCount = 4;
    this.tableauProps = { display: 'horizontal' };
    this.foundationProps = {};
    this.deckProps = { redeals: 2, stock: false, stockDraw: false };

    this.initialize(props.dispatch);
  }

  startGame (props) {
    console.log('startGame', props);

    const deckId = props.deck.stackId;
    const deckCards = props.stacksById[deckId];
    const dispatch = props.dispatch;

    this.handleShuffle(dispatch, deckId, deckCards);
    //this.deal();
  }

  deal (props) {
    const { tableaus, deck, stacksById, dispatch } = props;
    const cards = stacksById[deck.stackId];
    const tableauCount = tableaus.length;

    let stacks = { [deck.stackId]: [] };
    for(let i = 0; i < tableauCount; i++ ) {
      stacks[tableaus[i].stackId] = [];
    }

    const length = cards.length - 1;
    for(let i = 0; i < length; i++) {
      stacks[tableaus[i % tableauCount].stackId].push(cards[i]);
    }

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

  canMoveOntoFoundation (card, stack) {
    // if foundation is empty, can move if card is A
    if (stack.length !== 0) {
      if (card.rank === 'A') {
        return true
      }
    }
    else {
      // can move if card is same suit as top card, and one greater rank
      const topCard = stack[-1];
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(card, topCard)) {
          return true;
        }
      }
    }
    return false;
  }

  canDragFoundationCard (card, stack) {
    // can't drag foundation cards
    return false;
  }

  canDragTableauCard (card, stack) {
    // can drag top card only
    return stack[-1] === card.id;
  }

  render (props) {
    const { tableaus, foundations, deck, unicodeMode } = props;
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
