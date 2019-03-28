import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Tabs from 'containers/Tabs';

class App extends Component {
  // TODO: dynamically import and choose between html5backend and a touch backend
  // https://github.com/yahoo/react-dnd-touch-backend
  // test mouse with touch backend? may not need dynamic if touch works well with mouse
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
          <Tabs />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
