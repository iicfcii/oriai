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
    this.scale = this.props.scale

    // console.log(this.origami.faces[0].key);


    this.renderFaces = () =>{
      let faceViews = [];
      this.origami.faces.forEach((face) => {
        faceViews.push(
          <FaceView
            key = {face.key}
            offset = {this.offset}
            scale = {this.scale}
            polygon = {face.polygon}/>
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
