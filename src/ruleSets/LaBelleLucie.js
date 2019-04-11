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
    this.deckProps = { redeals: 2, stock: 0 };

    // so we don't reinitialize the game state every time we switch tabs
    if(!initialized) {
      this.initialize(dispatch);
    }
  }

  newGame ({ dispatch }) {

  }

  startGame (props) {
    this.deal(props);
  }

  dealCardsToTableaus (cards, tableaus) {
    const tableauCount = tableaus.length;
    let stacks = {}

    for (let i = 0; i < tableauCount; i++) {
      stacks[tableaus[i].stackId] = [];
    }

    const length = cards.length;
    for (let i = 0; i < length; i++) {
      stacks[tableaus[i % tableauCount].stackId].push(cards[i]);
    }

    return stacks;
  }

  deal (props) {
    const { tableaus, deck, stacksById, dispatch } = props;
    const cards = stacksById[deck.stackId];
    let stacks = this.dealCardsToTableaus(cards, tableaus);
    stacks[deck.stackId] = [];

    dispatch(cardFunctions.updateStacks(stacks))
  }

  handleDeckClick ({ id, dispatch, redeals, cards, tableaus, stacksById }) {
    let deckCards = cards.slice();
    if(redeals !== 0) {
      // return all tableau cards to deck
      for(let t of tableaus) {
        deckCards = deckCards.concat(stacksById[t.stackId]);
      }
      deckCards = CardLogic.shuffle(deckCards);
      const updatedStacks = this.dealCardsToTableaus(deckCards, tableaus);
      //set deck stack to empty
      updatedStacks[id] = [];
      dispatch(cardFunctions.handleRedeal(updatedStacks));
    }
  }

  canMoveOntoTableau (card, stack) {
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

  checkWinCondition = (state) => {
    for (let f of state.foundations) {
      if (state.stacksById[f.stackId].length !== 13) {
        return false;
      }
    }
    // if we got here, all 4 foundations have 13 cards. Winner!
    return true;
  }

  handleMoveCard (dispatch, card, fromStackId, toStackId) {
    dispatch(cardFunctions.moveCard(card, fromStackId, toStackId, this.checkWinCondition));
  }

  handleDoubleClickCard ({ dispatch, card, fromStackId, foundations, stacksById }) {
    for (let f of foundations) {
      const stack = stacksById[f.stackId];
      if (this.canMoveOntoFoundation(card, stack)) {
        this.handleMoveCard(dispatch, card, fromStackId, f.stackId);
        break;
      }
    }
  }

  render (props) {
    const { tableaus, foundations, deck, unicodeMode } = props;
    return (
      <div className={`gameboard ${unicodeMode ? 'unicode-mode' : ''}`}>
        <Deck {...deck.props}
          handleClick={ this.handleDeckClick.bind(this) }
          handleMoveCard={ this.handleMoveCard.bind(this) }
        />
        <div className='foundation-container'>
          <div className='foundation-col'>
            {
              foundations.map((f, i) => (
                <Foundation key={ f.stackId }
                  canMoveOnto={ this.canMoveOntoFoundation }
                  canDragCard={ this.canDragFoundationCard }
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
                canDragCard={ this.canDragTableauCard }
                handleMoveCard={ this.handleMoveCard.bind(this) }
                handleDoubleClickCard={ this.handleDoubleClickCard.bind(this) }
                { ...t.props }
              />
            ))
          }
        </div>
      </div>
    )
  }
}
