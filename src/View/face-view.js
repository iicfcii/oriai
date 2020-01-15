import React, { Component } from 'react';
import { Line, Group, Text} from 'react-konva';
import { EdgeView } from './edge-view';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);

    this.ID_WIDTH = 20;
    this.ID_HEIGHT = 10;

    this.state = {
      mouseover: false,
    }

    this.handleMouseover = () => {
      let str = 'ID: ' + this.props.face.id + ' Layer: ' + this.props.face.layer;
      // console.log(str);
      this.setState({mouseover: true,});
    }

    this.handleMouseout = () => {
      this.setState({mouseover: false,});
    }

    this.handleClick = () => {
      console.log(this.props.face)
    }
  }

  render() {
    if (!this.props.face.isShown) return null;

    let lines = [];
    this.props.face.edges.forEach((edge) => {
      lines.push(
        <EdgeView
          key = {edge.key}
          edge = {edge}
          paperLayout = {this.props.paperLayout}/>
      );
    });

    return (
      <Group>
        <Line
          points = {this.props.face.scale(this.props.paperLayout)}
          closed = {true}
          fill = {'white'}
          opacity = {this.state.mouseover? 0.6 : 1}
          onMouseover = {this.handleMouseover}
          onMouseout = {this.handleMouseout}
          onClick = {this.handleClick}/>
        {lines}
        <Text
          opacity = {this.state.mouseover? 0 : 1}
          x = {this.props.face.centroid.scale(this.props.paperLayout)[0]-this.ID_WIDTH/2}
          y = {this.props.face.centroid.scale(this.props.paperLayout)[1]-this.ID_HEIGHT/2}
          width = {this.ID_WIDTH}
          height = {this.ID_HEIGHT}
          text = {this.props.face.id}
          align = {'center'}
          verticalAlign = {'middle'}
        />
      </Group>
    );
  }
}
