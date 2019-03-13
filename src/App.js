import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Game from 'containers/Game';

class App extends Component {
  // TODO: dynamically import and choose between html5backend and a touch backend
  // https://github.com/yahoo/react-dnd-touch-backend
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
          <Game />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
