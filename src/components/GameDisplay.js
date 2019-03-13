import React, { Component } from 'react';
import { Views } from 'helpers/constants';
import 'styles/gameboard.scss'

import LaBelleLucie from 'ruleSets/LaBelleLucie';

class GameDisplay extends Component {

  // TODO: dynamic ruleset choice
  // https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
  // game will have a select for ruleset choice, which it will pass to RuleSet component
  // RuleSet will conditionally import and render the correct ruleset component

  //TODO: user settable preferences

  constructor (props) {
    super(props);
    this.ruleSet = new LaBelleLucie(props.dispatch);
  }

  render () {
    const { view, ...props } = this.props;
    switch (view) {
      case Views.GAME:
        return this.ruleSet.render(props);

      case Views.RULES:
        return (
          <div>HEY HOW DO I PLAY</div>
        )

      case Views.PREFS:
        return (
          <div>CHANGE YOUR PREFS</div>
        )

      default:
        return (
          <div>I'M LOST</div>
        )
    }
  }
}

export default GameDisplay;
