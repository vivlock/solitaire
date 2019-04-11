import React, { Component } from 'react';
import Card from 'containers/Card';

class DeckDisplay extends Component {
  renderDeck(cards, redeals, handleClick) {
    if (cards.length === 0) {
      // only 0 disallows redeals -- -1 is unlimited redeals
      const redealIconClass = (redeals !== 0)? 'icon-redeal' : 'icon-no-redeals';
      return (
        <div key='deck' className='deck deck-empty' onClick={ () => { handleClick(this.props) } }>
          <div className={`icon ${redealIconClass}`} />
        </div>
      )
    }
    else {
      return (
        <div key='deck' className='deck' onClick={ () => { handleClick(this.props) } }>
          <Card faceup={ false } />
        </div>
      )
    }
  }

  renderStock(stock) {
    // stock 0 means do not display stock, otherwise display # of cards equal to stock
    if (stock === 0) {
      return null;
    }
    else {
      // TODO: implement stock
      return (
        <div key='stock'>Not implemented</div>
      );
    }
  }

  render() {
    const cards = (this.props.cards === undefined ? [] : this.props.cards);
    const { redeals, stock, handleClick } = this.props;

    return [
      this.renderDeck(cards, redeals, handleClick),
      this.renderStock(stock)
    ];
  }
}

export default DeckDisplay;
