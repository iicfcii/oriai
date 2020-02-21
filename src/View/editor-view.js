import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Origami } from '../Model/origami';
import { Edge } from '../Model/edge';
import { Point } from '../Model/point';

import { Crease } from '../Model/crease';
import { Fold } from '../Model/fold';
import { Design } from '../Model/design';
import { DesignGenerator } from '../Model/design-generator';


import { OrigamiView } from './origami-view';

export class EditorView extends Component {
  constructor(props) {
    super(props);

    // this.design = new Design('Test');
    // let crease1 = new Edge(new Point(0,0.5),new Point(1,0.5));
    // this.design.addStep(new Crease([1],crease1));
    // this.design.addStep(new Fold([1],crease1,[1]));

    // this.design = new Design('Dog Face');
    // let crease1 = new Edge(new Point(1,0),new Point(0,1));
    // this.design.addStep(new Crease([1],crease1));
    // this.design.addStep(new Fold([1],crease1,[1]));
    // let crease2 = new Edge(new Point(0.6,0.4),new Point(1,0.3));
    // this.design.addStep(new Crease([1,2],crease2));
    // this.design.addStep(new Fold([3,2],crease2,[1,3]));
    // let crease3 = new Edge(new Point(0.4,0.6),new Point(0.3,1));
    // this.design.addStep(new Crease([1,4],crease3));
    // this.design.addStep(new Fold([5,6],crease3,[1,3]));
    // let crease4 = new Edge(new Point(1,0.7),new Point(0.7,1));
    // this.design.addStep(new Crease([1,4],crease4));
    // this.design.addStep(new Fold([1,8],crease4,[1,-1]));
    // let crease5 = new Edge(new Point(1,0.5),new Point(0.5,1));
    // this.design.addStep(new Crease([1],crease5));
    // this.design.addStep(new Fold([1],crease5,[1]));

    // this.design = new Design('Crane');
    // let crease1 = new Edge(new Point(1,0),new Point(0,1));
    // this.design.addStep(new Crease([1],crease1));
    // this.design.addStep(new Fold([1],crease1,[1]));
    // let crease2 = new Edge(new Point(0,0),new Point(1,1));
    // this.design.addStep(new Crease([1,2],crease2));
    // let crease3 = new Edge(new Point(0,0.5),new Point(1,0.5));
    // this.design.addStep(new Crease([1,2],crease3));
    // this.design.addStep(new Fold([5,2],crease3,[-1,1]));
    // let crease4 = new Edge(new Point(0.5,0.5),new Point(0.5,1));
    // this.design.addStep(new Crease([3,4],crease4));
    // this.design.addStep(new Fold([3,8],crease4,[-1,1]));
    // let a = 1-Math.tan(22.5*Math.PI/180)*0.5;
    // let crease5 = new Edge(new Point(a,0.5),new Point(1,1));
    // this.design.addStep(new Crease([1,5,2,6],crease5));
    // this.design.addStep(new Fold([1,5],crease5,[-1,1]));
    // this.design.addStep(new Fold([2,6],crease5,[-1,1]));
    // let crease6 = new Edge(new Point(0.5,a),new Point(1,1));
    // this.design.addStep(new Crease([4,8,3,7],crease6));
    // this.design.addStep(new Fold([7,15],crease6,[-1,1]));
    // this.design.addStep(new Fold([8,4],crease6,[-1,1]));
    // let crease7 = new Edge(new Point(a,0.5),new Point(0.5,a));
    // this.design.addStep(new Crease([16,9],crease7));
    // this.design.addStep(new Fold([16,18,7,1],crease7,[1,1,3,3]));
    // this.design.addStep(new Crease([13,12],crease7));
    // this.design.addStep(new Fold([19,12,4,6],crease7,[-1,-1,-3,-3]));
    // let b = (a+0.5)/2;
    // let crease8 = new Edge(new Point(b,b),new Point(0.5,1));
    // this.design.addStep(new Crease([15,3,14,8],crease8));
    // this.design.addStep(new Fold([22,15,14,8],crease8,[-1,-3,1,3]));
    // let crease9 = new Edge(new Point(b,b),new Point(1,0.5));
    // this.design.addStep(new Crease([5,10,11,2],crease9));
    // this.design.addStep(new Fold([10,5,27,2],crease9,[-1,-3,1,3]));
    // let crease10 = new Edge(new Point(b,0.35),new Point(1,0));
    // this.design.addStep(new Crease([10,5,2,27],crease10));
    // this.design.addStep(new Fold([30,10,2,32],crease10,[-1,-3,1,3]));

    this.design = new Design('Rabbit Ear Fold');
    let crease1 = new Edge(new Point(1,0),new Point(0,1));
    this.design.addStep(new Crease([1],crease1));
    this.design.addStep(new Fold([1],crease1,[1]));
    let crease2 = new Edge(new Point(0,0),new Point(1,1));
    this.design.addStep(new Crease([1,2],crease2));
    let a = 0.5-Math.tan(Math.PI/8)*1/Math.sin(Math.PI/4)/2*Math.cos(Math.PI/4);
    let b = 0.5+Math.tan(Math.PI/8)*1/Math.sin(Math.PI/4)/2*Math.sin(Math.PI/4);
    let crease3 = new Edge(new Point(a,b),new Point(1,1));
    this.design.addStep(new Crease([3,4],crease3));
    this.design.addStep(new Fold([5,4],crease3,[1,-1]));
    this.design.addStep(new Crease([4],crease1));
    this.design.addStep(new Fold([4,6,2],crease1,[-1,-3,-3]));

    this.w = 600;
    this.h = 600;

    this.state = {
      shouldShowAllLayers: true,
      step: this.design.origamis.length-1,
      space: 0,
      layerOffset: 0, // Unit: layer
      info: '',
    };

    this.layout = {
      ratio: 400,
      x: this.w/2,
      y: this.h/2,
      angle: 0,
      isometric: true,
    };
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

  onPrevStep = () => {
    if (this.state.step > 0){
      let origami = this.design.origamis[this.state.step - 1];
      this.setState({
        step: this.state.step - 1,
        layerOffset: 0,
      });
    }
  }

  onNextStep = () => {
    if (this.state.step < this.design.origamis.length - 1){
      let origami = this.design.origamis[this.state.step + 1];
      this.setState({
        step: this.state.step + 1,
        layerOffset: 0,
      });
    }
  }

  onSpaceChange = (event) => {
    let space = parseInt(event.target.value);
    // Scale vertical offset with space
    this.setState({
      space:space,
    });
  }

  onLayerOffsetChange = (event) => {
    this.setState({layerOffset:parseInt(event.target.value)});
  }

  setInfo = (info) => {
    this.setState({info: info});
  }

  render() {
    // Update layout
    this.layout.y = this.h/2+this.state.layerOffset*this.state.space;

    return (
      <div style = {container}>
        <div>
          <OrigamiView
            w = {this.w}
            h = {this.h}
            layout = {this.layout}
            space = {this.state.space}
            origami = {this.design.getOrigami(this.state.step)}
            setInfo = {this.setInfo}
          />
        </div>
        <div style = {containerTool}>
          <div style = {containerItem}>Tools</div>
          <div style = {containerItem}>{'Info: ' + this.state.info}</div>
          <div style = {containerItem}>{'Total Faces: ' + this.design.getOrigami(this.state.step).faces.length}</div>
          <div style = {containerItem}>{'Total Layers: ' + this.design.getOrigami(this.state.step).layers}</div>
          <div style = {containerItem}>
            {'Steps: '}
            <button onClick={this.onPrevStep}>Prev</button>
            {this.state.step.toFixed(0) + '/' + (this.design.origamis.length-1).toFixed(0)}
            <button onClick={this.onNextStep}>Next</button>
          </div>
          <div style = {containerItem}>
            {'Layer space: '}
            <input type="range" min="0" max="50" value={this.state.space} step="10" onChange={this.onSpaceChange}/>
            {' ' + this.state.space}
          </div>
          <div style = {containerItem}>
            {'Layer offset: '}
            <input
              type="range"
              min={-Math.floor((this.design.getOrigami(this.state.step).maxLayer+1)/2)}
              max={Math.floor((this.design.getOrigami(this.state.step).maxLayer+1)/2)}
              value={this.state.layerOffset}
              step={1}
              onChange={this.onLayerOffsetChange}/>
              {' ' + this.state.layerOffset}
          </div>
        </div>
      </div>
    );
  }
}

const container = {
  height: 600,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
const containerTool = {
  height: 600,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white ',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
const containerItem = {
  margin: '10px 0px',
};
