import React, { Component } from 'react';
import { Circle } from 'react-konva';

export class PointView extends Component {
  constructor(props) {
    super(props);

  }

  onMouseover = () => {
    let info = 'Point (' + this.props.point.x.toFixed(2) +
               ', ' + this.props.point.y.toFixed(2) +
               ')';
    this.props.update({
      info: info,
      pointOver: this.props.point
    });
  }

  onMouseout = () => {
    this.props.update({
      info: '',
      pointOver: null
    });
  }

  onClick = () => {
  }

  render() {
    let isOver = this.props.pointOver === this.props.point;
    let point = this.props.point.scale(this.props.layout);

    return (
      <Circle
        opacity = {this.props.opacity}
        x = {point[0]}
        y = {point[1]}
        radius = {isOver?5:3}
        fill = {'red'}
        hitStrokeWidth = {10}
        onMouseover = {this.onMouseover}
        onMouseout = {this.onMouseout}
        onClick = {this.onClick}/>
    );
  }
}
