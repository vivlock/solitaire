import { connect } from 'react-redux';
import TableauDisplay from 'components/TableauDisplay';

const mapStateToProps = ({ app, game }, ownProps) => {
  return {
    cards: game.stacksById[ownProps.id],
    unicodeMode: app.prefs.unicodeMode,

    // for double click handling
    stacksById: game.stacksById,
    tableaus: game.tableaus,
    foundations: game.foundations
  }
}

const Tableau = connect(
  mapStateToProps
)(TableauDisplay)

export default Tableau;
