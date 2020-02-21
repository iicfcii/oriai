import React, { Component } from 'react';
import { Line } from 'react-konva';

// Visuailize Edge
export class EdgeView extends Component {
  constructor(props) {
    super(props);
  }

  handleMouseover = () => {
    this.props.selection.setEdgeOver(this.props.edge);
  }

  handleMouseout = () => {
    this.props.selection.setEdgeOver(null);
  }

  handleClick = () => {
    // if (!this.props.edge.isCrease) return;
    // let twin = this.props.edge.twin;
    // console.log('Parents',
    //             this.props.edge.parentFace1.id,
    //             this.props.edge.parentFace2.id,
    //             'Twin Parents',
    //             twin?twin.parentFace1.id:'NA',
    //             twin?twin.parentFace2.id:'NA');
    // console.log('Points',
    //             this.props.edge.p1,
    //             this.props.edge.p2);
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
        onMouseover = {this.handleMouseover}
        onMouseout = {this.handleMouseout}
        onClick = {this.handleClick}>
      </Line>
    );
  }
}
