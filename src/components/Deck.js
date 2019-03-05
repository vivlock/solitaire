import React, { Component } from 'react';
import { connect } from 'react-redux';

class DeckDisplay extends Component {
  render() {
    const cards = this.props.stack.cards;
    return (
      <div className='deck'>{ cards.length } Cards</div>
    )
  }
}

const mapStateToProps = state => {
  const stack = state.stacksById[state.deck.stackId];
  return {
    stack: stack
  }
}

const Deck = connect(
  mapStateToProps
)(DeckDisplay)

export default Deck;
