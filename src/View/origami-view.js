import React, { Component } from 'react';
import { FaceView } from './face-view'
import { Layer, Stage, Rect } from 'react-konva';

// Visuailize Face
export class OrigamiView extends Component {
  constructor(props) {
    super(props);

    this.renderFaces = () =>{
      let faceViews = [];
      this.props.origami.faces.forEach((face) => {
        // console.log(face.key);
        faceViews.push(
          <FaceView
            key = {face.key}
            face = {face}
            paperLayout = {this.paperLayout}/>
        )
      });

      return faceViews;
    }


  }

  render() {
    let faces = [];
    this.props.origami.faces.forEach((face) => {
      // console.log(face.key);
      faces.push(
        <FaceView
          key = {face.key}
          face = {face}
          paperLayout = {this.props.paperLayout}/>
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
