import React from 'react';

import Tableau from 'containers/Tableau';
import Foundation from 'containers/Foundation';
import Deck from 'containers/Deck';

import RuleSet from 'ruleSets/RuleSet'
import CardLogic from 'helpers/cardLogic';

import { cardFunctions } from 'redux/actions/cardActions';

export default class LaBelleLucie extends RuleSet {
  constructor (initialized, dispatch) {
    super();

    this.tableauCount = 18;
    this.tableauProps = { display: 'horizontal' };
    this.deckProps = { redeals: 2, stock: false, stockDraw: false };

    // so we don't reinitialize the game state every time we switch tabs
    if(!initialized) {
      this.initialize(dispatch);
    }
  }

  startGame (props) {
    console.log('startGame', props);

    const deckId = props.deck.stackId;
    const deckCards = props.stacksById[deckId];
    const dispatch = props.dispatch;

    this.handleShuffle(dispatch, deckId, deckCards);
    this.deal(props);
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

    dispatch(cardFunctions.updateStacks(stacks))
  }

  canMoveOntoTableau (card, stack) {
    console.log('canMoveOntoTableau');
    const length = stack.length;
    // cannot move onto empty tableau
    if (length !== 0) {
      // can move if card is same suit as top card, one lower rank than top card
      const topCard = stack[length - 1];
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(topCard, card)) {
          return true;
        }
      }
    }
    return false;
  }

  canMoveOntoFoundation (card, stack) {
    console.log('canMoveOntoFoundation', card, stack);
    const length = stack.length;
    // if foundation is empty, can move if card is A
    if (length === 0) {
      if (card.rank === 'A') {
        return true
      }
    }
    else {
      // can move if card is same suit as top card, and one greater rank
      const topCard = stack[length - 1];
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(card, topCard)) {
          return true;
        }
      }
    }
    return false;
  }

  canDragFoundationCard = (card, stack) => {
    // can't drag foundation cards
    return false;
  }

  canDragTableauCard = (card, stack) => {
    // can drag top card only
    const topCard = stack[stack.length - 1];
    if(topCard !== undefined) {
      return topCard.id === card.id;
    }
  }

  handleMoveCard (dispatch, card, fromStackId, toStackId) {
    dispatch(cardFunctions.moveCard(card, fromStackId, toStackId));
  }

  handleClickDeck () {
    console.log('deck clicked');
    // redeal -- collect cards from tableaus back into the deck
    // deal as normal
    // decrement # of redeals available
  }

  render (props) {
    const { tableaus, foundations, deck, unicodeMode } = props;
    return (
      <div className={`gameboard ${unicodeMode ? 'unicode-mode' : ''}`}>
        <Deck {...deck.props}
          handleClick={ this.handleClickDeck.bind(this) }
          handleMoveCard={ this.handleMoveCard.bind(this) }
        />
        <div className='foundation-container'>
          <div className='foundation-col'>
            {
              foundations.map((f, i) => (
                <Foundation key={ f.stackId }
                  canMoveOnto={ this.canMoveOntoFoundation }
                  canDragCard={ this.canDragFoundationCard.bind(this) }
                  handleMoveCard={ this.handleMoveCard.bind(this) }
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
                canMoveOnto={ this.canMoveOntoTableau }
                canDragCard={ this.canDragTableauCard.bind(this) }
                handleMoveCard={ this.handleMoveCard.bind(this) }
                { ...t.props }
              />
            ))
          }
        </div>
      </div>
    )
  }
}
