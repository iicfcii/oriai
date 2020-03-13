import React, { Component } from 'react';
import { Layer, Stage, Rect, Text, Line, Circle } from 'react-konva';
import { FaceView } from './FaceView'
import { Point } from '../Model/Point'

// Visuailize Face
export class OrigamiView extends Component {
  constructor(props) {
    super(props);

    this.LABEL_WIDTH = 50;
    this.LABEL_HEIGHT = 12;
    this.LABEL_OFFSET = 5;
  }

  onClick = () => {
    this.props.update({
      info: '',
      pointSelected: [],
      edgeSelected: [],
      faceSelected: [],
    });
  }

  renderFaces =() => {
    let faces = [];
    this.props.origami.faces.forEach((face) => {
      // console.log(face.key);
      let layout = {
        ratio: this.props.layout.ratio,
        x: this.props.layout.x,
        y: this.props.layout.y-face.layer*this.props.space,
        angle: this.props.layout.angle,
        isometric: this.props.layout.isometric,
      }

      faces.push(
        <FaceView
          key = {face.key}
          face = {face}
          layout = {layout}
          space = {this.props.space}
          faceSelected = {this.props.faceSelected}
          edgeSelected = {this.props.edgeSelected}
          pointSelected = {this.props.pointSelected}
          update = {this.props.update}/>
      );
    });

    return(
      <Layer>
        {faces}
      </Layer>
    );
  }

  renderFrame = () => {
    let pA = new Point(0,0);
    let pB = new Point(1,0);
    let pC = new Point(1,1);
    let pD = new Point(0,1);
    let frame = pA.scale(this.props.layout)
                  .concat(pB.scale(this.props.layout),
                          pC.scale(this.props.layout),
                          pD.scale(this.props.layout));
    return(
      <Layer>
        <Rect
          x = {0}
          y = {0}
          width = {this.props.dimension.width}
          height = {this.props.dimension.height}
          fill = '#f0f0f0'
          onClick = {this.onClick}
          preventDefault={false}>
        </Rect>
        <Line
          points = {frame}
          closed = {true}
          stroke = {'black'}
          strokeWidth = {1}
          listening = {false}/>
        <Circle
          x = {frame[0]}
          y = {frame[1]}
          radius = {2}
          fill = {'black'}/>
        <Circle
          x = {frame[2]}
          y = {frame[3]}
          radius = {2}
          fill = {'black'}/>
        <Circle
          x = {frame[4]}
          y = {frame[5]}
          radius = {2}
          fill = {'black'}/>
        <Circle
          x = {frame[6]}
          y = {frame[7]}
          radius = {2}
          fill = {'black'}/>
        <Text
          x = {frame[0]-this.LABEL_WIDTH/2}
          y = {frame[1]-this.LABEL_HEIGHT-this.LABEL_OFFSET}
          width = {this.LABEL_WIDTH}
          height = {this.LABEL_HEIGHT}
          fill = {'black'}
          text = {'(0, 0)'}
          align = {'center'}
          verticalAlign = {'middle'}
          listening = {false}/>
        <Text
          x = {frame[2]+this.LABEL_OFFSET}
          y = {frame[3]-this.LABEL_HEIGHT/2}
          width = {this.LABEL_WIDTH}
          height = {this.LABEL_HEIGHT}
          fill = {'black'}
          text = {'(1, 0)'}
          align = {'left'}
          verticalAlign = {'middle'}
          listening = {false}/>
        <Text
          x = {frame[4]-this.LABEL_WIDTH/2}
          y = {frame[5]+this.LABEL_OFFSET}
          width = {this.LABEL_WIDTH}
          height = {this.LABEL_HEIGHT}
          fill = {'black'}
          text = {'(1, 1)'}
          align = {'center'}
          verticalAlign = {'middle'}
          listening = {false}/>
        <Text
          x = {frame[6]-this.LABEL_WIDTH-this.LABEL_OFFSET}
          y = {frame[7]-this.LABEL_HEIGHT/2}
          width = {this.LABEL_WIDTH}
          height = {this.LABEL_HEIGHT}
          fill = {'black'}
          text = {'(0, 1)'}
          align = {'right'}
          verticalAlign = {'middle'}
          listening = {false}/>
      </Layer>
    );
  }

  render() {
    return (
      <Stage
        width={this.props.dimension.width}
        height={this.props.dimension.height}>
        {this.renderFrame()}
        {this.renderFaces()}
      </Stage>
    );
  }
}
