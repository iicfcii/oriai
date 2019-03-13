import React, { Component } from 'react';
import { Line, Group } from 'react-konva';
import { EdgeView } from './edge-view';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseover: false,
    }

    this.handleMouseover = () => {
      let newState = {
        mouseover: true,
      }

      let str = 'ID: ' + this.props.face.id + ' Layer: ' + this.props.face.layer;
      console.log(str);
      this.setState(newState);
    }

    this.handleMouseout = () => {
      let newState = {
        mouseover: false,
      }

      this.setState(newState);
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
          fill = {'white'}
          opacity = {this.state.mouseover? 0.9 : 1}
          onMouseover = {this.handleMouseover}
          onMouseout = {this.handleMouseout}>
        </Line>
        {lines}
      </Group>
    );
  }
}
