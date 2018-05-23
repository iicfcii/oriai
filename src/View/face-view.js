import React, { Component } from 'react';
import { Line } from 'react-konva';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);

    this.polygon = this.props.polygon;
    // console.log(this.props.offset);

    // Scale up and offset
    for (let i = 0; i < this.polygon.length; i += 2){
      this.polygon[i] = this.polygon[i]*this.props.scale+this.props.offset.x;
    }
    for (let i = 1; i < this.polygon.length; i += 2){
      this.polygon[i] = this.polygon[i]*this.props.scale+this.props.offset.y;
    }

    this.colors = ['white', 'red', 'green', 'blue'];
    this.getColors = () => {
      return this.colors[Math.floor(Math.random()*this.colors.length)];
    }
  }

  render() {
    return (
      <Line
        points = {this.polygon}
        stroke = 'black'
        strokeWidth = {5}
        closed = {true}
        fill = {this.getColors()}
        opacity = {0.5}
        lineJoin = 'round'>
      </Line>
    );
  }
}
