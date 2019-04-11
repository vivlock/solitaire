import React, { Component } from 'react';
import 'styles/gameboard.scss'

import LaBelleLucie from 'ruleSets/LaBelleLucie';

class GameDisplay extends Component {

  // TODO: dynamic ruleset choice and import
  // https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports

  constructor (props) {
    super(props);
    this.ruleSet = new LaBelleLucie(this.props.gameInitialized, this.props.dispatch);
  }

  newGame () {
    this.ruleSet.newGame(this.props);
  }

  componentDidUpdate (prevProps) {
    if (this.props.gameInitialized && !prevProps.gameInitialized) {
      this.ruleSet.startGame(this.props);
    }
  }

  renderWinOverlay (winCondition) {
    if (winCondition) {
      return (
        <div className='overlay' onClick={ this.newGame.bind(this) }>YOU WIN</div>
      )
    }
    return null;
  }

  render () {
    return [
      this.renderWinOverlay(this.props.gameWon),
      this.ruleSet.render(this.props)
    ]
  }
}

export default GameDisplay;
