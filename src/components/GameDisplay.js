import React, { Component } from 'react';
import 'styles/gameboard.scss'

import LaBelleLucie from 'ruleSets/LaBelleLucie';

class GameDisplay extends Component {

  // TODO: dynamic ruleset choice and import
  // https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports

  constructor (props) {
    super(props);
    this.ruleSet = new LaBelleLucie(props.dispatch);
  }

  startGame() {
    this.ruleSet.startGame(this.props);
  }

  render () {
    return this.ruleSet.render(this.props);
  }
}

export default GameDisplay;
