import React, { Component } from 'react';
import { Views } from 'helpers/constants';
import { updateView } from 'redux/actions/appActions';

import Game from 'containers/Game';
import UserPrefs from 'containers/UserPrefs';
import ChooseGame from 'containers/ChooseGame';

import 'styles/app.scss';

class TabsDisplay extends Component {
  renderViewPane (view) {
    switch (view) {
      case Views.GAME:
        return <Game />;
      case Views.CHOOSE:
        return <ChooseGame />;
      case Views.PREFS:
        return <UserPrefs />;
      default:
        return <div>Error fetching view "{view}"</div>;
    }
  }

  handleTabClick(view) {
    this.props.dispatch(updateView(view));
  }

  render () {
    const { view } = this.props;
    const views = [
      {v: Views.CHOOSE, className: (view === Views.CHOOSE ? 'selected' : ''), text: "Choose Game"},
      {v: Views.GAME, className: (view === Views.GAME ? 'selected' : ''), text: "Play"},
      {v: Views.PREFS, className: (view === Views.PREFS ? 'selected' : ''), text: "Preferences"}
    ]
    return (
      <div>
        <div className='tabs'>
          {
            views.map((tab) => (
              <span key={tab.v} onClick={ () => this.handleTabClick(tab.v) } { ...tab }>{ tab.text }</span>
            ))
          }
        </div>
        { this.renderViewPane(view) }
      </div>
    )
  }
}

export default TabsDisplay;
