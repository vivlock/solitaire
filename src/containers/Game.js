import { connect } from 'react-redux';
import GameDisplay from 'components/GameDisplay';

const mapStateToProps = state => {
  return {
    prefs: state.prefs
  }
}

const Game = connect(
  mapStateToProps
)(GameDisplay);

export default Game;
