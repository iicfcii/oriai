import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Origami } from './Model/origami';
import { OrigamiView } from './View/origami-view';

class App extends Component {
  constructor(props) {
    super(props);
    this.origami = new Origami();
    // console.log(this.origami.faces);
    this.scale = 500;
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            x = {0}
            y = {0}
            width = {window.innerWidth}
            height = {window.innerHeight}
            fill = 'gray'>
          </Rect>
        </Layer>
        <OrigamiView
          origami = {this.origami}
          offset = {{
            x: window.innerWidth/2-this.scale/2,
            y: window.innerHeight/2-this.scale/2
          }}
          scale = {this.scale}/>
      </Stage>
    );
  }
}

export default App;
