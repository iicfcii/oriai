import React, { Component } from 'react';
import { Line, Group, Text} from 'react-konva';
import { EdgeView } from './edge-view';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);

    this.ID_WIDTH = 20;
    this.ID_HEIGHT = 10;
  }

  handleMouseover = () => {
    this.props.selection.setFaceOver(this.props.face);
  }

  handleMouseout = () => {
    this.props.selection.setFaceOver(null);
  }

  render() {
    // Determine face opacity
    let opacity = 1;
    if (this.props.selection.faceOver){
      if(this.props.face !== this.props.selection.faceOver) opacity = 0.1;
    }

    // Prepare edges
    let lines = [];
    this.props.face.edges.forEach((edge) => {
      let edgeOver = this.props.selection.edgeOver;
      let isOver = false;
      if(edgeOver){
        isOver = edge === edgeOver || edge === edgeOver.twin;
      }

      lines.push(
        <EdgeView
          key = {edge.key}
          edge = {edge}
          over = {isOver}
          opacity = {opacity}
          layout = {this.props.layout}
          selection = {this.props.selection}/>
      );
    });

    return (
      <Group>
        <Line
          points = {this.props.face.scale(this.props.layout)}
          closed = {true}
          fill = {'white'}
          onMouseover = {this.handleMouseover}
          onMouseout = {this.handleMouseout}
          onClick = {this.handleClick}
          opacity = {opacity}/>
        {lines}
        <Text
          x = {this.props.face.centroid.scale(this.props.layout)[0]-this.ID_WIDTH/2}
          y = {this.props.face.centroid.scale(this.props.layout)[1]-this.ID_HEIGHT/2}
          width = {this.ID_WIDTH}
          height = {this.ID_HEIGHT}
          text = {this.props.face.id}
          align = {'center'}
          verticalAlign = {'middle'}
          opacity = {opacity}
        />
      </Group>
    );
  }
}
