import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { Theme } from '../Style';

export class PointView extends Component {
  constructor(props) {
    super(props);

  }

  onClick = () => {
    let index = this.props.pointSelected.indexOf(this.props.point);
    let newPointSelected = this.props.pointSelected.slice(); // Make a copy
    if (index !== -1) {
      // Already selected, deselect
      newPointSelected.splice(index,1);
    } else {
      newPointSelected.push(this.props.point);
    }

    let info = '';
    if (newPointSelected.length === 1){
      info = 'Point (' + newPointSelected[0].x.toFixed(2) +
             ', ' + newPointSelected[0].y.toFixed(2) +
             ')';
    } else if (newPointSelected.length > 1){
      info = 'Multiple points selected';
    } else {
    }
    this.props.update({
      info: info,
      pointSelected: newPointSelected,
    });
  }

  render() {
    let isSelected = this.props.pointSelected.indexOf(this.props.point) !== -1;
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
