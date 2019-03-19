import React, { Component } from 'react';
import { Line, Group, Text} from 'react-konva';
import { EdgeView } from './edge-view';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);
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
          points = {this.props.face.scale(this.props.paperLayout.ratio,this.props.paperLayout.x,this.props.paperLayout.y)}
          closed = {true}
          fill = {this.state.mouseover? 'grey' : 'white'}
          opacity = {this.state.mouseover? 0.9 : 1}
          onMouseover = {this.handleMouseover}
          onMouseout = {this.handleMouseout}
          onClick = {this.handleClick}/>
        {lines}
      </Group>
    );
  }
}
