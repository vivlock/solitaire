import { connect } from 'react-redux';
import DeckDisplay from 'components/DeckDisplay';

const mapStateToProps = ({ game }, ownProps) => {
  return {
    cards: game.stacksById[ownProps.id],
    ...game.deck,
    tableaus: game.tableaus,
    stacksById: game.stacksById
  }
}

const Deck = connect(
  mapStateToProps
)(DeckDisplay)

export default Deck;
