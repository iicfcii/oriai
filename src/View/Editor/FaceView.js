import React, { Component } from 'react';
import Konva from 'konva';
import { Line, Group, Text} from 'react-konva';
import { EdgeView } from './EdgeView';
import { PointView } from './PointView';
import { Theme } from '../Style';

// Visuailize Face
export class FaceView extends Component {
  constructor(props) {
    super(props);

    this.ID_WIDTH = 28;
    this.ID_HEIGHT = 14;
    this.faceRef = React.createRef();
  }

  onClick = () => {
    let index = this.faceIndex();
    let newFaceSelected = this.props.faceSelected.slice();
    if (index !== -1) {
      // Already selected, deselect
      newFaceSelected.splice(index,1);
    } else {
      newFaceSelected.push(this.props.face);
    }

    let info = '';
    if (newFaceSelected.length === 1){
      info = 'Face ' + newFaceSelected[0].id + ' is on layer ' + newFaceSelected[0].layer;
    } else if (newFaceSelected.length > 1){
      info = 'Multiple faces selected';
    } else {
    }

    this.props.setInfo(info);
    this.props.setFaceSelected(newFaceSelected);
  }

  renderEdges = (opacity) => {
    // Prepare edges
    let edges = [];
    this.props.face.edges.forEach((edge) => {
      edges.push(
        <EdgeView
          key = {edge.key}
          edge = {edge}
          edgeSelected = {this.props.edgeSelected}
          setEdgeSelected = {this.props.setEdgeSelected}
          opacity = {opacity}
          layout = {this.props.layout}
          update = {this.props.update}
          setInfo = {this.props.setInfo}/>
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
          faceId = {this.props.face.id}
          point = {edge.p1}
          pointSelected = {this.props.pointSelected}
          setPointSelected = {this.props.setPointSelected}
          opacity = {opacity}
          layout = {this.props.layout}
          update = {this.props.update}
          setInfo = {this.props.setInfo}/>
      );
    });

    return points;
  }

  renderFace = (opacity) => {
    return(
      <Line
        filters={[Konva.Filters.Brighten]}
        ref={this.faceRef}
        points = {this.props.face.scale(this.props.layout)}
        closed = {true}
        fill = {Theme.global.colors.red}
        onClick = {this.onClick}
        onTap = {this.onClick}
        opacity = {opacity}/>
    );
  }

  renderLabel = (opacity) => {
    let fontStyle = 'normal'
    if(this.props.faceOver && this.props.face === this.props.faceOver) fontStyle = 'bold';

    return(
      <Text
        fill = {Theme.global.colors.dark2}
        fontFamily={'Josefin Sans'}
        fontSize={'14'}
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

  faceIndex= () => {
    // Object seems to chagne with hook
    let index = -1;
    this.props.faceSelected.forEach((face, i) => {
      if (face.id === this.props.face.id) index = i;
    });
    return index
  }

  componentDidUpdate () {
    // Determine face color
    let isSelected = this.faceIndex() !== -1;
    if (this.faceRef.current){
      this.faceRef.current.cache();
      if (isSelected && !this.props.highlight) {
        this.faceRef.current.brightness(0.2);
      } else {
        this.faceRef.current.brightness(0);
      }
      this.faceRef.current.getLayer().batchDraw();
    }
  }

  render() {
    let isSelected = this.faceIndex() !== -1;

    // Determine entire face opacity
    let opacity = 1;
    if (this.props.highlight &&
        this.props.faceSelected.length > 0){
      if(this.faceIndex() === -1) {
        opacity = 0.1;
      }
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
