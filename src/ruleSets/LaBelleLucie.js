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
    this.tableauCount = 18;
    this.foundationCount = 4;
    this.defaultTableauProps = { display: 'horizontal', draggable: true };
    this.defaultFoundationProps = { draggable: false }
    this.defaultDeckProps = { redeals: 2, stock: false, stockDraw: false };
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

  handleMoveCard (card, fromStack, toStack) {
    // can only move cards from tableau
    if (fromStack.type === 'tableau') {
      // can only move top card from tableau
      if (fromStack.isTopCard(card)) {
        if (toStack.type === 'tableau') {
          this.handleMoveOntoTableau(card, toStack);
        }
        else if (toStack.type === 'foundation') {
          this.handleMoveOntoFoundation(card, toStack);
        }
      }
    }
  }

  handleMoveOntoFoundation (card, foundation) {
    // can only move the next higher rank card of the same suit as the top card onto foundation
    const topCard = foundation.peek();
    if (topCard === undefined) {
      if (card.rank === 'A') {
        foundation.push(card);
        return true;
      }
    }
    else if (topCard.suit === card.suit && CardLogic.isOneGreater(card, topCard)) {
      foundation.push(card);
      return true;
    }
    return false;
  }

  handleMoveOntoTableau (card, tableau) {
    // can only move the next lower rank card of the same suit as the top card onto tableau
    const topCard = tableau.peek();
    if(topCard.suit === card.suit && CardLogic.isOneGreater(topCard, card)) {
      tableau.push(card);
      return true;
    }
    return false;
  }

  handleDoubleClickCard (card, stack, foundations, tableaus) {
    if (stack.type === 'tableau') {
      if (stack.isTopCard(card)) {
        // TODO: check if card can go to any foundation; if so, move to that foundation
      }
      else {
        // after the last deal, one tableau card can be moved to the top of its stack
        if (this.state.redeals === 0 && this.state.draw === true) {
          stack.removeCardById(card.id);
          stack.push(card);
          this.setState({ draw: false })
        }
      }
    }
  }

  render () {
    const { tableaus, foundations, deck } = this.state;
    return (
      <div className='gameboard'>
        <Deck {...deck.props} stack={ deck.stack } />
        <div className='foundation-container'>
          <div className='foundation-col'>
            {
              foundations.map((f, i) => (
                <Foundation key={ f.id } stack={ f.stack } { ...f.props }  />
              ))
            }
          </div>
        </div>
        <div className='tableau-container'>
          {
            tableaus.map((t) => (
              <Tableau key={ t.id } stack={ t.stack } { ...t.props } />
            ))
          }
        </div>
      </div>
    )
  }

}
