import React, { Component } from 'react';
import { Line, Group, Text} from 'react-konva';
import { EdgeView } from './EdgeView';
import { PointView } from './PointView';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);

    this.ID_WIDTH = 20;
    this.ID_HEIGHT = 10;
  }

  onMouseover = () => {
    this.props.update({
      info: 'Face ' + this.props.face.id + ' is on layer ' + this.props.face.layer,
      faceOver: this.props.face
    });
  }

  onMouseout = () => {
    this.props.update({
      info: '',
      faceOver: null
    });
  }

  onClick = () => {
    let index = this.props.faceSelected.indexOf(this.props.face);
    if (index !== -1) {
      // Already selected, deselect
      let newFaceSelected = this.props.faceSelected.slice(); // Make a copy
      newFaceSelected.splice(index,1);
      this.props.update({
        faceSelected: newFaceSelected,
      });
    } else {
      let newFaceSelected = this.props.faceSelected.slice(); // Make a copy
      newFaceSelected.push(this.props.face);
      this.props.update({
        faceSelected: newFaceSelected,
      });
    }

  }

  renderEdges = (opacity) => {
    // Prepare edges
    let edges = [];
    this.props.face.edges.forEach((edge) => {
      let edgeOver = this.props.edgeOver;
      let isOver = false;
      if(edgeOver){
        isOver = edge === edgeOver || edge === edgeOver.twin;
      }

      edges.push(
        <EdgeView
          key = {edge.key}
          edge = {edge}
          over = {isOver}
          opacity = {opacity}
          layout = {this.props.layout}
          update = {this.props.update}/>
      );
    });

    return edges;
  }

  renderPoints = (opacity) => {
    let points = [];
    this.props.face.edges.forEach((edge) => {
      points.push(
        <PointView
          key = {edge.parentFace1.id+edge.p1.key}
          point = {edge.p1}
          pointOver = {this.props.pointOver}
          opacity = {opacity}
          layout = {this.props.layout}
          update = {this.props.update}/>
      );
    });

    return points;
  }

  renderFace = (opacity) => {
    // Determine face color
    let color = 'white';
    if (this.props.faceSelected){
      if(this.props.faceSelected.indexOf(this.props.face) !== -1) color = 'yellow';
    }

    return(
      <Line
        points = {this.props.face.scale(this.props.layout)}
        closed = {true}
        fill = {color}
        onMouseover = {this.onMouseover}
        onMouseout = {this.onMouseout}
        onClick = {this.onClick}
        opacity = {opacity}/>
    );
  }

  renderLabel = (opacity) => {
    let fontStyle = 'normal'
    if(this.props.faceOver && this.props.face === this.props.faceOver) fontStyle = 'bold';

    return(
      <Text
        fontStyle = {fontStyle}
        x = {this.props.face.centroid.scale(this.props.layout)[0]-this.ID_WIDTH/2}
        y = {this.props.face.centroid.scale(this.props.layout)[1]-this.ID_HEIGHT/2}
        width = {this.ID_WIDTH}
        height = {this.ID_HEIGHT}
        text = {this.props.face.id}
        align = {'center'}
        verticalAlign = {'middle'}
        opacity = {opacity}
        listening = {false}
      />
    );
  }

  render() {
    // Determine entire face opacity
    let opacity = 1;
    // if (this.props.faceSelected.length > 0){
    //   if(this.props.faceSelected.indexOf(this.props.face) === -1) {
    //     return null;
    //   }
    // }
    if (this.props.space > 0 && this.props.faceOver){
      if(this.props.face !== this.props.faceOver) opacity = 0.1;
    }

    return (
      <Group>
        {this.renderFace(opacity)}
        {this.renderEdges(opacity)}
        {this.renderPoints(opacity)}
        {this.renderLabel(opacity)}
      </Group>
    );
  }
}
