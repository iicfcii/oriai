import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Origami } from '../Model/origami';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

import { OrigamiView } from './origami-view';

export class EditorView extends Component {
  constructor(props) {
    super(props);
    this.origami = new Origami();

    let crease1 = new Edge(new Point(1,0),new Point(0,1));
    this.origami.singleCrease(1,crease1);
    this.origami.singleFold(1, crease1, 1);
    let crease2 = new Edge(new Point(0.6,0.4),new Point(1,0.3));
    this.origami.singleCrease(1,crease2);
    this.origami.singleCrease(2,crease2);
    this.origami.singleFold(3,crease2,1);
    this.origami.singleFold(2,crease2,3);
    let crease3 = new Edge(new Point(0.4,0.6),new Point(0.3,1));
    this.origami.singleCrease(1,crease3);
    this.origami.singleCrease(4,crease3);
    this.origami.singleFold(5,crease3,1);
    this.origami.singleFold(6,crease3,3);
    let crease4 = new Edge(new Point(1,0.7),new Point(0.7,1));
    this.origami.singleCrease(1,crease4);
    this.origami.singleCrease(4,crease4);
    this.origami.singleFold(1,crease4,1);
    this.origami.singleFold(8,crease4,-1);
    let crease5 = new Edge(new Point(1,0.5),new Point(0.5,1));
    this.origami.singleCrease(1,crease5);
    this.origami.singleFold(1,crease5,1);

    // this.origami.singleFold(3,crease2,1);
    // this.origami.singleFold(2,crease2,3);
    // let crease1 = new Edge(new Point(1,0),new Point(0,1));
    // this.origami.singleCrease(1,crease1);
    // this.origami.singleFold(1, crease1, 1);
    // let crease2 = new Edge(new Point(0.5,0.5),new Point(1,1));
    // this.origami.singleCrease(1,crease2);
    // this.origami.singleCrease(2,crease2);
    // this.origami.singleFold(3,crease2,1);

    this.w = 600;
    this.h = 600;
    // this.paperLayout = {
    //   ratio: 400,
    //   x: this.w/2,
    //   y: (this.h-400*Math.sqrt(2))/2,
    //   angle: 45,
    // };
    this.paperLayout = {
      ratio: 400,
      x: 100,
      y: 100,
      angle: 0,
    };

    this.state = {
      layer: '0',
      shouldShowAllLayers: 'ON',
    }

  }

  onLayerChange = (event) => {
    // console.log(event.target)
    let valStr = event.target.value;

    this.origami.showLayers([parseInt(valStr,10)]);

    this.setState({
      layer: valStr,
      shouldShowAllLayers: 'OFF',
    });
  }

  onToggleAllLayer = () => {
    if (this.state.shouldShowAllLayers === 'OFF'){
      this.origami.changeAllLayerVisibility(true);
    } else {
      this.origami.showLayers([parseInt(this.state.layer,10)]);
    }

    this.setState({
      shouldShowAllLayers: this.state.shouldShowAllLayers === 'ON' ? 'OFF' : 'ON',
    })
  }

  renderOptions = () => {
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

  render() {
    const containerStyle = {
      height: this.h,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };
    const containerToolStyle = {
      height: this.h,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white ',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    return (
      <div style = {containerStyle}>
        <div>
          <OrigamiView
            w = {this.w}
            h = {this.h}
            paperLayout = {this.paperLayout}
            origami = {this.origami}
          />
        </div>
        <div style = {containerToolStyle}>
          <div>Tools</div>
          <div>{'Total Faces: ' + this.origami.faces.length}</div>
          <div>{'Total Layers: ' + this.origami.layers}</div>
          <div>
            {'Show all layers is '}
            <button onClick={this.onToggleAllLayer}>{this.state.shouldShowAllLayers}</button>
          </div>
          <div>
            {'Select Layers: '}
            <select value={this.state.layer} onChange={this.onLayerChange}>
              {this.renderOptions()}
            </select>
          </div>
          <div>
            {'Steps: '}
            <button onClick={this.onPrevStep}>Prev</button>
            { 6 + '/' + 10}
            <button onClick={this.onNextStep}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}
