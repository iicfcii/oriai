import React, { Component } from 'react';
import { Line } from 'react-konva';
import { Theme } from '../Style';

export class EdgeView extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    let index = this.edgeIndex();
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
          info = 'Edge of paper';
        }
    } else if (newEdgeSelected.length > 1){
      info = 'Multiple edges selected';
    } else {
    }
    this.props.setInfo(info);
    this.props.setEdgeSelected(newEdgeSelected);
  }

  edgeIndex= () => {
    // Object seems to chagne with hook
    let index = -1;
    this.props.edgeSelected.forEach((edge, i) => {
      if (edge.parentFace1.id === this.props.edge.parentFace1.id &&
          edge.isEqual(this.props.edge)) index = i;
    });
    return index
  }


  render() {
    let isSelected = this.edgeIndex() !== -1;

    return (
      <Line
        opacity = {this.props.opacity}
        points = {this.props.edge.scale(this.props.layout)}
        stroke = {this.props.edge.isBoundary?Theme.global.colors.dark2:Theme.global.colors.blue}
        strokeWidth = {isSelected?8:5}
        hitStrokeWidth = {8}
        lineCap = 'round'
        onClick = {this.onClick}
        onTap = {this.onClick}/>
    );
  }
}
