import { connect } from 'react-redux';
import TableauDisplay from 'components/TableauDisplay';

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.stacksById[ownProps.id],
    unicodeMode: state.prefs.unicodeMode
  }
}

const Tableau = connect(
  mapStateToProps
)(TableauDisplay)

export default Tableau;
