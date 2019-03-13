import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaBelleLucie from 'containers/ruleSets/LaBelleLucie'
import 'styles/gameboard.scss'

class GameDisplay extends Component {
  // TODO: dynamically import and choose between html5backend and a touch backend
  // https://github.com/yahoo/react-dnd-touch-backend

  // TODO: dynamic ruleset choice
  // https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
  // game will have a select for ruleset choice, which it will pass to RuleSet component
  // RuleSet will conditionally import and render the correct ruleset component

  //TODO: user settable preferences

  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <LaBelleLucie />
      </DragDropContextProvider>
    )
  }
}

export default GameDisplay;
