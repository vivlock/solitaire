import React, { Component } from 'react';

class DeckDisplay extends Component {
  render() {
    const cards = (this.props.cards === undefined ? [] : this.props.cards);
    return (
      <div className='deck'>{ cards.length } Cards</div>
    )
  }
}

export default DeckDisplay;
