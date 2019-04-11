import { connect } from 'react-redux';
import CardDisplay from 'components/CardDisplay';

const mapStateToProps = ({ app }) => ({
  unicodeMode: app.prefs.unicodeMode
})

const Card = connect(
  mapStateToProps
)(CardDisplay)

export default Card;
