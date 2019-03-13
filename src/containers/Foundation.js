import { connect } from 'react-redux';
import FoundationDisplay from 'components/FoundationDisplay';

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.stacksById[ownProps.id]
  }
}

const Foundation = connect(
  mapStateToProps
)(FoundationDisplay)

export default Foundation;
