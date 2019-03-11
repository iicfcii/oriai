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

    this.face = this.props.face;
    // console.log(this.props.offset);

    // Scale up and offset
    this.polygon = this.props.scale(this.face.polygonFlat);
    this.handleMouseover = () => {
      let newState = {
        mouseover: true,
      }

      let str = 'ID: ' + this.face.id + ' Layer: ' + this.face.layer;
      console.log(str);
      this.setState(newState);
    }
    this.handleMouseout = () => {
      let newState = {
        mouseover: false,
      }

      this.setState(newState);
    }

    this.getFill = () => {
      if (this.state.mouseover){
        return '#f0f0f0';
      } else {
        return '#ffffff';
      }
    }
  }

  render() {
    if (!this.face.isShown) return null;

    let lines = [];
    this.props.face.edges.forEach((edge) => {
      lines.push(
        <EdgeView
          key = {edge.key}
          edge = {edge}
          scale = {this.props.scale}
          setInfo = {this.props.setInfo}/>
      );
    });

    return (
      <Group>
        <Line
          points = {this.polygon}
          closed = {true}
          fill = {this.getFill()}
          onMouseover = {this.handleMouseover}
          onMouseout = {this.handleMouseout}>
        </Line>
        {lines}
      </Group>
    );
  }
}
