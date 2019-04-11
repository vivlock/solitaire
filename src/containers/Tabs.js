import { connect } from 'react-redux';
import TabsDisplay from 'components/TabsDisplay';

const mapStateToProps = state => {
  return {
    view: state.app.currentView
  }
}

const Tabs = connect(
  mapStateToProps
)(TabsDisplay);

export default Tabs;
