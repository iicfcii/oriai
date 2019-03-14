import React, { Component } from 'react';
import { Line } from 'react-konva';

// Visuailize Edge
export class EdgeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseover: false,
    }

    this.handleMouseover = () => {
      let newState = {
        mouseover: true,
      }

      let str = 'p1(' + this.props.edge.p1.x + ', ' + this.props.edge.p1.y + ')' +
               ' p2(' + this.props.edge.p2.x + ', ' + this.props.edge.p2.y + ')';
      // console.log(str);
      this.setState(newState);
    }

    this.handleMouseout = () => {
      let newState = {
        mouseover: false,
      }

      this.setState(newState);
    }

    this.getStrokeWidth = () => {
      if (this.state.mouseover){
        return 8;
      } else {
        return 6;
      }
    }
  }

  render() {
    let p = this.props.edge.scale(this.props.paperLayout.ratio,this.props.paperLayout.x,this.props.paperLayout.y);
    let c = 'black';

    if (!this.props.edge.isBoundary){
      c = 'red';
    }

    return (
      <Line
        points = {p}
        stroke = {c}
        strokeWidth = {this.getStrokeWidth()}
        lineCap = 'round'
        lineJoint = 'round'
        onMouseover = {this.handleMouseover}
        onMouseout = {this.handleMouseout}>
      </Line>
    );
  }
}
