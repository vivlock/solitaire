import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LaBelleLucie from 'ruleSets/LaBelleLucie'
import 'styles/gameboard.scss'

class Game extends Component {
  constructor (props) {
    super(props)
    const gameState = { win: false };

    // TODO: dynamic ruleset choice
    // https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
    // game will have a dropdown for ruleset choice, which it will pass to RuleSet component
    // RuleSet will conditionally import and render the correct ruleset component

    // TODO: user defined themes, prefs
    // starting with unicode card display, 'cause I wanna play with it but not hardcode it
    const userPrefs = { unicodeMode: true };

    this.state = { gameState: gameState, userPrefs: userPrefs }
  }

  componentDidMount () {
    this.startGame();
  }

  startGame () {
    this.refs.ruleSet.startGame();
  }

  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <LaBelleLucie ref={ 'ruleSet' } prefs={ this.state.userPrefs } />
      </DragDropContextProvider>
    )
  }
}

export default Game;
