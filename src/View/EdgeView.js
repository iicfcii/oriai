import React, { Component } from 'react';
import { Line, Group } from 'react-konva';
import { PointView } from './PointView';

export class EdgeView extends Component {
  constructor(props) {
    super(props);
  }

  onMouseover = () => {
    let twin = this.props.edge.twin;
    let info = '';
    if (twin) {
      info = 'Crease connects face ' + twin.parentFace1.id +
             ' and ' + twin.parentFace2.id;
    } else {
      info = 'Edge';
    }
    this.props.update({
      info: info,
      edgeOver: this.props.edge
    });
  }

  onMouseout = () => {
    this.props.update({
      info: '',
      edgeOver: null
    });
  }

  onClick = () => {
  }

  render() {
    return (
      <Line
        opacity = {this.props.opacity}
        points = {this.props.edge.scale(this.props.layout)}
        stroke = {this.props.edge.isBoundary?'black':'red'}
        strokeWidth = {this.props.over?5:3}
        hitStrokeWidth = {10}
        lineCap = 'round'
        lineJoint = 'round'
        onMouseover = {this.onMouseover}
        onMouseout = {this.onMouseout}
        onClick = {this.onClick}/>
    );
  }
}
