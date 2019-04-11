import { connect } from 'react-redux';
import UserPrefsDisplay from 'components/UserPrefsDisplay';

const mapStateToProps = state => {
  return {
    prefs: state.app.prefs
  }
}

const UserPrefs = connect(
  mapStateToProps
)(UserPrefsDisplay);

export default UserPrefs;
