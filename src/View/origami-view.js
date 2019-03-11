import React, { Component } from 'react';
import { FaceView } from './face-view'
import { Layer } from 'react-konva';

// Visuailize Face
export class OrigamiView extends Component {
  constructor(props) {
    super(props);

    // Refernces for props
    this.origami = this.props.origami;
    this.offset = this.props.offset;
    this.scaleValue = this.props.scaleValue

    // console.log(this.origami.faces[0].key);

    this.scale = (p) => {
      // Copy the points
      let points = p.slice();
      for (let i = 0; i < points.length; i += 2){
        points[i] = points[i]*this.scaleValue+this.offset.x;
      }
      for (let i = 1; i < points.length; i += 2){
        points[i] = points[i]*this.scaleValue+this.offset.y;
      }

      return points;
    }

    this.renderFaces = () =>{
      let faceViews = [];
      this.origami.faces.forEach((face) => {
        // console.log(face.key);
        faceViews.push(
          <FaceView
            key = {face.key}
            face = {face}
            scale = {this.scale}
            setInfo = {this.props.setInfo}/>
        )
      });

      return faceViews;
    }


  }

  render() {
    return (
      <Layer>
        {this.renderFaces()}
      </Layer>
    );
  }
}
