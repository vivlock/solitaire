import { connect } from 'react-redux';
import FoundationDisplay from 'components/FoundationDisplay';

const mapStateToProps = ({ game }, ownProps) => {
  return {
    cards: game.stacksById[ownProps.id]
  }
}

const Foundation = connect(
  mapStateToProps
)(FoundationDisplay)

export default Foundation;
