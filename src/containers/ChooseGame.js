import { connect } from 'react-redux';
import ChooseGameDisplay from 'components/ChooseGameDisplay';

const mapStateToProps = state => {
  return {
    view: state.currentView
  }
}

const ChooseGame = connect(
  mapStateToProps
)(ChooseGameDisplay);

export default ChooseGame;
