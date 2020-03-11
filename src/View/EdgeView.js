import React, { Component } from 'react';
import { Line } from 'react-konva';

export class EdgeView extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    let index = this.props.edgeSelected.indexOf(this.props.edge);
    let newEdgeSelected = this.props.edgeSelected.slice(); // Make a copy
    if (index !== -1) {
      // Already selected, deselect
      newEdgeSelected.splice(index,1);
    } else {
      newEdgeSelected.push(this.props.edge);
    }

    let info = '';
    if (newEdgeSelected.length === 1){
        let twin = newEdgeSelected[0].twin;
        if (twin) {
          info = 'Crease connects face ' + twin.parentFace1.id +
                 ' and ' + twin.parentFace2.id;
        } else {
          info = 'Edge';
        }
    } else if (newEdgeSelected.length > 1){
      info = 'Multiple edges selected';
    } else {
    }
    this.props.update({
      info: info,
      edgeSelected: newEdgeSelected,
    });
  }

  render() {
    let isSelected = this.props.edgeSelected.indexOf(this.props.edge) !== -1;

    return (
      <Line
        opacity = {this.props.opacity}
        points = {this.props.edge.scale(this.props.layout)}
        stroke = {this.props.edge.isBoundary?'black':'red'}
        strokeWidth = {isSelected?5:3}
        hitStrokeWidth = {10}
        lineCap = 'round'
        lineJoint = 'round'
        onClick = {this.onClick}/>
    );
  }
}
