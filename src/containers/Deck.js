import { connect } from 'react-redux';
import DeckDisplay from 'components/DeckDisplay';

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.stacksById[ownProps.id],
    unicodeMode: state.prefs.unicodeMode
  }
}

const Deck = connect(
  mapStateToProps
)(DeckDisplay)

export default Deck;
