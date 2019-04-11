import { connect } from 'react-redux';
import ChooseGameDisplay from 'components/ChooseGameDisplay';

const mapStateToProps = ({ app }) => {
  return {
    view: app.currentView
  }
}

const ChooseGame = connect(
  mapStateToProps
)(ChooseGameDisplay);

export default ChooseGame;
