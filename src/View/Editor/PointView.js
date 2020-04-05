import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { Theme } from '../Style';

export class PointView extends Component {
  constructor(props) {
    super(props);

  }

  onClick = () => {
    let index = this.pointIndex();
    let newPointSelected = this.props.pointSelected.slice(); // Make a copy
    if (index !== -1) {
      // Already selected, deselect
      newPointSelected.splice(index,1);
    } else {
      // Record face id to know which face this point belongs to
      newPointSelected.push({point: this.props.point, faceId: this.props.faceId});
    }

    let info = '';
    if (newPointSelected.length === 1){
      info = 'Point (' + newPointSelected[0].point.x.toFixed(2) +
             ', ' + newPointSelected[0].point.y.toFixed(2) +
             ')';
    } else if (newPointSelected.length > 1){
      info = 'Multiple points selected';
    } else {
    }
    this.props.setInfo(info);
    this.props.setPointSelected(newPointSelected);
  }

  pointIndex= () => {
    // Object seems to chagne with hook
    let index = -1;
    this.props.pointSelected.forEach((point, i) => {
      if (point.faceId === this.props.faceId &&
          point.point.isEqual(this.props.point)) index = i;
    });
    return index
  }


  render() {
    let isSelected = this.pointIndex() !== -1;
    let point = this.props.point.scale(this.props.layout);

    return (
      <Circle
        opacity = {this.props.opacity}
        x = {point[0]}
        y = {point[1]}
        radius = {isSelected?4:3}
        fill = {Theme.global.colors.yellow}
        hitStrokeWidth = {8}
        onClick = {this.onClick}
        onTap = {this.onClick}/>
    );
  }
}
