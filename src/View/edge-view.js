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

      // console.log(this.props.edge);
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

    this.handleClick = () => {
      if (!this.props.edge.isCrease) return;
      console.log('Parents',
                  this.props.edge.parentFace1.id,
                  this.props.edge.parentFace2.id,
                  'Twin Parents',
                  this.props.edge.twin.parentFace1.id,
                  this.props.edge.twin.parentFace2.id);
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
        onMouseout = {this.handleMouseout}
        onClick = {this.handleClick}>
      </Line>
    );
  }
}
