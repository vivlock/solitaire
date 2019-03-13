import { connect } from 'react-redux';
import LaBelleLucieDisplay from 'components/ruleSets/LaBelleLucieDisplay';

const mapStateToProps = state => {
  console.log('labellelucie mapstate', state);
  return {
    tableaus: state.tableaus,
    foundations: state.foundations,
    deck: state.deck,
    stacksById: state.stacksById,
    unicodeMode: state.prefs.unicodeMode
  }
}

const LaBelleLucie = connect(
  mapStateToProps
)(LaBelleLucieDisplay);

export default LaBelleLucie;
