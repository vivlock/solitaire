import { connect } from 'react-redux';
import GameDisplay from 'components/GameDisplay';

const mapStateToProps = ({ app, game }) => {
  return {
    gameInitialized: game.gameInitialized,
    gameWon: game.gameWon,
    unicodeMode: app.prefs.unicodeMode,
    ruleSet: game.ruleSet,
    tableaus: game.tableaus,
    foundations: game.foundations,
    deck: game.deck,
    stacksById: game.stacksById
  }
}

const Game = connect(
  mapStateToProps
)(GameDisplay);

export default Game;
