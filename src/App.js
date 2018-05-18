import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Text } from 'react-konva';

class App extends Component {
  render() {
    return (
      <Stage width={800} height={800}>
        <Layer>

          <Rect
            x = {0}
            y = {0}
            width = {800}
            height = {800}
            fill = "#0f0f0f">
          </Rect>
        </Layer>
        <Layer>
          <Rect
            x = {0}
            y = {0}
            width = {600}
            height = {600}
            fill = "#66ccff">
          </Rect>
        </Layer>
      </Stage>
    );
  }
}

export default App;
