import React, { Component } from 'react';
import Views from 'helpers/constants';
import Game from 'containers/Game';
import UserPrefs from 'containers/UserPrefs';
import ChooseGame from 'containers/ChooseGame';

class TabsDisplay extends Component {
  getViewPane (view) {
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

  render () {
    const { view } = this.props;
    const viewpane = this.getViewPane(view);
    return (
      <div>
        <ul class='tabs'>
          <li id={`tab-${Views.GAME}`}>Play</li>
          <li id={`tab-${Views.CHOOSE}`}>Choose Game</li>
          <li id={`tab-${Views.PREFS}`}>Preferences</li>
        </ul>
        { viewpane }
      </div>
    )
  }
}

export default TabsDisplay;
