import React, { Component } from 'react';
import RuleSet from 'helpers/RuleSet';
import CardLogic from 'helpers/cardLogic';
import Deck from 'components/Deck';
import Foundation from 'components/Foundation';
import Tableau from 'components/Tableau';

// https://politaire.com/help/labellelucie
// actually this is la belle lucie with a draw, it's more fun
// but la belle lucie is a better name than
// https://politaire.com/help/threeshufflesandadraw
export default class LaBelleLucie extends Component {
  constructor (props) {
    super (props)

    const unicodeMode = props.prefs.unicodeMode;
    const tableauCount = 18;
    const foundationCount = 4;
    const tableauProps = { display: 'horizontal', draggable: true, unicodeMode: unicodeMode };
    const foundationProps = { draggable: false, unicodeMode: unicodeMode }
    const deckProps = { redeals: 2, stock: false, stockDraw: false, unicodeMode: unicodeMode };

    this.ruleSet = RuleSet.new({ tableauCount, foundationCount, tableauProps, foundationProps, deckProps });
    this.ruleSet.initialize(props.dispatch);
  }

  startGame () {
    const deckId = this.props.deck.stackId;
    const deckStack = this.props.stacksById[deckId];
    const dispatch = this.props.dispatch;

    this.ruleSet.handleShuffle(dispatch, deckId, deckStack);
    this.deal();
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

  canDragFoundationCard (card, stackId) {
    return false;
  }

  canDragTableauCard (card, stackId) {
    // if card is top card
    const tableauStack = this.props.stacksById[stackId];
    if (tableauStack.peek().id === card.id) {
      return true;
    }
    return false;
  }

  render () {
    const { tableaus, foundations, deck } = this.props;
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
