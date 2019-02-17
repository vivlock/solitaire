import React, { Component } from 'react';
import LaBelleLucie from 'ruleSets/LaBelleLucie'
import 'styles/gameboard.scss'

class Game extends Component {
  constructor (props) {
    super(props)
    const gameState = { win: false };

    this.state = { gameState: gameState }
  }

  componentDidMount () {
    this.startGame();
  }

  startGame () {
    this.refs.ruleSet.startGame();
  }

  render () {
    return (
      <LaBelleLucie ref={ 'ruleSet' } />
    )
  }
}

export default Game;
