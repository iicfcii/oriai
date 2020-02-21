import React, { Component } from 'react';
import { FaceView } from './face-view'
import { Layer, Stage, Rect, Text, Line } from 'react-konva';

// Visuailize Face
export class OrigamiView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edgeOver: null,
      faceOver: null,
    }
  }

  setEdgeOver = (edge) => {
    this.setState({edgeOver: edge});
  }

  setFaceOver = (face) => {
    if (face) {
      this.props.setInfo('Face layer is ' + face.layer);      
    } else {
      this.props.setInfo('Face');
    }

    this.setState({faceOver: face});
  }

  render() {
    let faces = [];
    this.props.origami.faces.forEach((face) => {
      // console.log(face.key);
      let layout = {
        ratio: this.props.layout.ratio,
        x: this.props.layout.x,
        y: this.props.layout.y-(face.layer-this.props.origami.maxLayer/2)*this.props.space,
        angle: this.props.layout.angle,
        isometric: this.props.layout.isometric,
      }
      faces.push(
        <FaceView
          key = {face.key}
          face = {face}
          layout = {layout}
          selection = {{
            edgeOver: this.state.edgeOver,
            faceOver: this.state.faceOver,
            setEdgeOver: this.setEdgeOver,
            setFaceOver: this.setFaceOver,
          }}/>
      )
    });

    return (
      <Stage width={this.props.w} height={this.props.h}>
        <Layer>
          <Rect
            x = {0}
            y = {0}
            width = {this.props.w}
            height = {this.props.h}
            fill = '#f0f0f0'>
          </Rect>
        </Layer>
        <Layer>
          {faces}
        </Layer>
      </Stage>
    );
  }
}
