import { connect } from 'react-redux';
import TabsDisplay from 'components/TabsDisplay';

const mapStateToProps = state => {
  return {
    view: state.currentView
  }
}

const Tabs = connect(
  mapStateToProps
)(TabsDisplay);

export default Tabs;
