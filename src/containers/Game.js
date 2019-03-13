import { connect } from 'react-redux';
import GameDisplay from 'components/GameDisplay';

const mapStateToProps = state => {
  return {
    unicodeMode: state.prefs.unicodeMode,
    ruleSet: state.ruleSet,
    tableaus: state.tableaus,
    foundations: state.foundations,
    deck: state.deck,
    stacksById: state.stacksById
  }
}

const Game = connect(
  mapStateToProps
)(GameDisplay);

export default Game;
