import React from 'react';
import RuleSet from './RuleSet';
import Deck from 'stacks/Deck';
import Foundation from 'stacks/Foundation';
import Tableau from 'stacks/Tableau';
import CardLogic from 'helpers/cardLogic';

// https://politaire.com/help/labellelucie
// actually this is la belle lucie with a draw, it's more fun
// but la belle lucie is a better name than
// https://politaire.com/help/threeshufflesandadraw
export default class LaBelleLucie extends RuleSet {
  constructor (props) {
    super (props)
    const unicodeMode = props.prefs.unicodeMode;

    this.tableauCount = 18;
    this.foundationCount = 4;
    this.defaultTableauProps = { display: 'horizontal', draggable: true, unicodeMode: unicodeMode };
    this.defaultFoundationProps = { draggable: false, unicodeMode: unicodeMode }
    this.defaultDeckProps = { redeals: 2, stock: false, stockDraw: false, unicodeMode: unicodeMode };
    this.state = {
      deck: this.createDeck(),
      tableaus: this.createTableaus(),
      foundations: this.createFoundations()
    }
  }

  startGame () {
    this.shuffleDeck();
    this.deal();
  }

  shuffleDeck () {
    let { deck } = this.state;
    CardLogic.shuffle(deck.stack.cards);
    this.setState({
      deck: deck
    });
  }

  deal () {
    let { tableaus, deck } = this.state;
    let i = 0;
    let card = deck.stack.pop();
    while(card !== undefined) {
      tableaus[i % this.tableauCount].stack.push(card);
      card = deck.stack.pop();
      i++;
    }
    this.setState({
      deck: deck,
      tableaus: tableaus
    })
  }

  handleClickDeck () {
    // // collect all cards from tableaus, shuffle and redeal
    // const { tableaus, deck } = this.state;
    // for (let tableau of tableaus) {
    //   deck.stack.push()
    // }
  }

  canMoveOntoTableau (card, tableau) {
    // cannot move onto empty tableau
    if (!tableau.stack.isEmpty()) {
      // can move if card is same suit as top card, one lower rank than top card
      const topCard = tableau.stack.peek();
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(topCard, card)) {
          return true;
        }
      }
    }
    return false;
  }

  canMoveOntoFoundation (card, foundation) {
    // if foundation is empty, can move if card is A
    if (foundation.stack.isEmpty()) {
      if (card.rank === 'A') {
        return true
      }
    }
    else {
      // can move if card is same suit as top card, and one greater rank
      const topCard = foundation.stack.peek();
      if (card.suit === topCard.suit) {
        if (CardLogic.isOneGreater(card, topCard)) {
          return true;
        }
      }
    }
    return false;
  }

  canDragFoundationCard (cardId, foundationIdx) {
    return false;
  }

  canDragTableauCard (cardId, tableauIdx) {
    // if card is top card
    const tableau = this.state.tableaus[tableauIdx];
    if (tableau.stack.peek().id === cardId) {
      return true;
    }
    return false;
  }

  render () {
    const { tableaus, foundations, deck } = this.state;
    const unicodeMode = this.props.prefs.unicodeMode;
    return (
      <div className={`gameboard ${unicodeMode ? 'unicode-mode' : ''}`}>
        <Deck {...deck.props} stack={ deck.stack } />
        <div className='foundation-container'>
          <div className='foundation-col'>
            {
              foundations.map((f, i) => (
                <Foundation key={ f.id }
                  stack={ f.stack }
                  canMoveOnto={ this.canMoveOntoFoundation.bind(this) }
                  handleMoveOnto={ this.handleMoveOntoFoundation.bind(this) }
                  removeCard={ this.handleRemoveFoundationCard.bind(this) }
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
              <Tableau key={ t.id }
                stack={ t.stack }
                canMoveOnto={ this.canMoveOntoTableau.bind(this) }
                handleMoveOnto={ this.handleMoveOntoTableau.bind(this) }
                removeCard={ this.handleRemoveTableauCard.bind(this) }
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
