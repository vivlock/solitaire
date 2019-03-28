import { connect } from 'react-redux';
import CardDisplay from 'components/CardDisplay';

const mapStateToProps = (state, ownProps) => ({
  unicodeMode: state.prefs.unicodeMode
})

const Card = connect(
  mapStateToProps
)(CardDisplay)

export default Card;
