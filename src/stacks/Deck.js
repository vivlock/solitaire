import React, { Component } from 'react';

class Deck extends Component {
  render() {
    const cards = this.props.stack.cards;
    return (
      <div className='deck'>{ cards.length } Cards</div>
    )
  }
}

export default Deck;
