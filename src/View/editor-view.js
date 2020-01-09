import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Origami } from '../Model/origami';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

import { Crease } from '../Model/crease';
import { Fold } from '../Model/fold';
import { Design } from '../Model/design';

import { OrigamiView } from './origami-view';

export class EditorView extends Component {
  constructor(props) {
    super(props);

    this.design = new Design();

    let crease1 = new Edge(new Point(1,0),new Point(0,1));
    this.design.addStep(new Crease([1],crease1));
    this.design.addStep(new Fold([1],[crease1],[1]));

    let crease2 = new Edge(new Point(0.6,0.4),new Point(1,0.3));
    this.design.addStep(new Crease([1,2],crease2));
    // this.design.addStep(new Fold([3],[crease2],[1]));
    this.design.addStep(new Fold([3,2],[crease2,crease2],[1,3]));

    let crease3 = new Edge(new Point(0.4,0.6),new Point(0.3,1));
    this.design.addStep(new Crease([1,4],crease3));
    this.design.addStep(new Fold([5,6],[crease3,crease3],[-1,1]));

    let crease4 = new Edge(new Point(1,0.7),new Point(0.7,1));
    this.design.addStep(new Crease([1,4],crease4));
    this.design.addStep(new Fold([1,8],[crease4,crease4],[1,-1]));

    let crease5 = new Edge(new Point(1,0.5),new Point(0.5,1));
    this.design.addStep(new Crease([1],crease5));
    this.design.addStep(new Fold([1],[crease5],[1]));

    // let crease1 = new Edge(new Point(0,0.5),new Point(0.5,0));
    //
    // this.design.addStep(new Crease([1],crease1));
    // this.design.addStep(new Fold([1],[crease1],[1]));
    // this.design.addStep(new Fold([1],[crease1],[-1]));

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
      layer: 0,
      shouldShowAllLayers: true,
      step: this.design.origamis.length-1,
    }

    this.updateLayersVisibility(this.state.shouldShowAllLayers,this.state.layer);
  }

  updateLayersVisibility = (shouldShowAllLayers, layer) => {
    if (shouldShowAllLayers){
      this.design.getOrigami(this.state.step).showLayersOnly(this.design.getOrigami(this.state.step).layers);
    } else {
      this.design.getOrigami(this.state.step).showLayersOnly([layer]);
    }
  }

  onToggleAllLayer = () => {
    let nextVal = !this.state.shouldShowAllLayers;
    this.updateLayersVisibility(nextVal,this.state.layer);

    this.setState({
      shouldShowAllLayers: nextVal,
    })
  }

  renderOptions = () => {
    let options = [];
    let layers = this.design.getOrigami(this.state.step).layers;
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

  onPrevLayer = () => {
    if (this.state.layer > this.design.getOrigami(this.state.step).minLayer){
      let nextVal = this.state.layer - 1;
      this.updateLayersVisibility(false,nextVal);
      this.setState({
        shouldShowAllLayers: false,
        layer: nextVal,
      });
    }
  }

  onNextLayer = () => {
    if (this.state.layer < this.design.getOrigami(this.state.step).maxLayer){
      let nextVal = this.state.layer + 1;
      this.updateLayersVisibility(false,nextVal);
      this.setState({
        shouldShowAllLayers: false,
        layer: nextVal,
      });
    }
  }

  onPrevStep = () => {
    if (this.state.step > 0){
      this.setState({step: this.state.step - 1});
    }
  }

  onNextStep = () => {
    if (this.state.step < this.design.origamis.length - 1){
      this.setState({step: this.state.step + 1});
    }
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
            origami = {this.design.getOrigami(this.state.step)}
          />
        </div>
        <div style = {containerToolStyle}>
          <div>Tools</div>
          <div>{'Total Faces: ' + this.design.getOrigami(this.state.step).faces.length}</div>
          <div>{'Total Layers: ' + this.design.getOrigami(this.state.step).layers}</div>
          <div>
            {this.state.shouldShowAllLayers?'Showing all layers':'Showing single layer'}
            <button onClick={this.onToggleAllLayer}>{'Toggle'}</button>
          </div>
          <div>
            {'Layers: '}
            <button onClick={(this.onPrevLayer)}>Prev</button>
            { this.state.layer.toFixed(0) + '/' + this.design.getOrigami(this.state.step).maxLayer}
            <button onClick={this.onNextLayer}>Next</button>
          </div>
          <div>
            {'Steps: '}
            <button onClick={(this.onPrevStep)}>Prev</button>
            { this.state.step.toFixed(0) + '/' + (this.design.origamis.length-1).toFixed(0)}
            <button onClick={this.onNextStep}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}
