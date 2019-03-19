import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Origami } from '../Model/origami';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

import { OrigamiView } from './origami-view';
import { ToolView } from './tool-view';

export class EditorView extends Component {
  constructor(props) {
    super(props);
    this.origami = new Origami();

    // Some temporary operations
    // let crease1 = new Edge(new Point(0,0.75),new Point(0.75,0));
    // this.origami.singleCrease(this.origami.getFaceByID(1),crease1,[]);
    // this.origami.singleFold(this.origami.getFaceByID(1),crease1,'valley');
    // this.origami.sortFaces();
    // let crease2 = new Edge(new Point(0.75,0.25),new Point(0.25,0.75));
    // this.origami.singleCrease(this.origami.getFaceByID(1),crease2,[]);
    // this.origami.singleFold(this.origami.getFaceByID(1),crease2,'valley');
    // this.origami.sortFaces();
    // let crease3 = new Edge(new Point(0.25,0.25),new Point(1,1));
    // this.origami.multiCrease(crease3);
    // this.origami.sortFaces();
    let crease1 = new Edge(new Point(0,1),new Point(1,0));
    this.origami.singleCrease(this.origami.getFaceByID(1),crease1,[]);
    let crease2 = new Edge(new Point(0.5,1),new Point(1,0));
    this.origami.singleCrease(this.origami.getFaceByID(2),crease2,[]);
    this.origami.singleFold(this.origami.getFaceByID(2),crease2,'valley');
    this.origami.sortFaces();
    let crease3 = new Edge(new Point(0,0.5),new Point(1,0.5));
    this.origami.multiCrease(crease3);
    this.origami.sortFaces();

    this.w = 600;
    this.h = 600;
    this.paperLayout = {
      ratio: 400,
      x: 100,
      y: 100,
    };

    this.state = {
      layer: '0',
      showAllLayers: 'ON',
    }

    this.handleOnLayerChange = (event) => {
      // console.log(event.target)
      let valStr = event.target.value;

      this.origami.showLayers([parseInt(valStr,10)]);

      this.setState({
        layer: valStr,
        showAllLayers: 'OFF',
      });
    }

    this.handleShowAllLayerClick = () => {
      if (this.state.showAllLayers === 'OFF'){
        this.origami.changeAllLayerVisibility(true);
      } else {
        this.origami.showLayers([parseInt(this.state.layer,10)]);
      }

      this.setState({
        showAllLayers: this.state.showAllLayers === 'ON' ? 'OFF' : 'ON',
      })
    }

    this.renderOptions = () => {
      let options = [];
      let layers = this.origami.layers;
      for (let i = 0; i <layers.length; i ++){
        options.push(
          <option
            key = {layers[i].toString()}
            value = {layers[i].toString()}>
            {layers[i].toString()}
          </option>
        );
      }
      return options;
    }

  }

  render() {
    const toolStyle = {
      height: 600,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white ',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    const containerStyle = {
      height: this.h,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    return (
      <div style = {containerStyle}>
        <div>
          <OrigamiView
            w = {600}
            h = {600}
            paperLayout = {this.paperLayout}
            origami = {this.origami}/>
        </div>
        <div style = {toolStyle}>
          <div>Tools</div>
          <div>{'Total Faces: ' + this.origami.faces.length}</div>
          <div>{'Total Layers: ' + this.origami.layers}</div>
          <div>
            {'Show all layers: '}
            <button onClick={this.handleShowAllLayerClick}>{this.state.showAllLayers}</button>
          </div>
          <div>
            {'Select Layers: '}
            <select value={this.state.layer} onChange={this.handleOnLayerChange}>
              {this.renderOptions()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
