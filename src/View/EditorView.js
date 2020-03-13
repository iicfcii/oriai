import React, { Component } from 'react';
import { OrigamiView } from './OrigamiView';
import { EditView } from './EditView';
import { ViewView } from './ViewView';
import { FileView } from './FileView';

import { Design } from '../Model/Design';
import { Point } from '../Model/Point';
import { Crease } from '../Model/Crease';
import { Fold } from '../Model/Fold';
import { Edge } from '../Model/Edge';

export class EditorView extends Component {
  constructor(props) {
    super(props);

    this.design = new Design();
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

    // this.design = new Design('Rabbit Ear Fold');
    // let crease1 = new Edge(new Point(1,0),new Point(0,1));
    // this.design.addStep(new Crease([1],crease1));
    // this.design.addStep(new Fold([1],crease1,[1]));
    // let crease2 = new Edge(new Point(0,0),new Point(1,1));
    // this.design.addStep(new Crease([1,2],crease2));
    // let a = 0.5-Math.tan(Math.PI/8)*1/Math.sin(Math.PI/4)/2*Math.cos(Math.PI/4);
    // let b = 0.5+Math.tan(Math.PI/8)*1/Math.sin(Math.PI/4)/2*Math.sin(Math.PI/4);
    // let crease3 = new Edge(new Point(a,b),new Point(1,1));
    // this.design.addStep(new Crease([3,4],crease3));
    // this.design.addStep(new Fold([5,4],crease3,[1,-1]));
    // this.design.addStep(new Crease([4],crease1));
    // this.design.addStep(new Fold([4,6,2],crease1,[-1,-3,-3]));

    this.state = {
      width: 0, // Window dimension
      height: 0,
      shouldPortrait: false,
      // Most mobile devices will be portrait mode
      // even device is in landscape mode
      step: this.design.origamis.length-1,
      space: 0,
      layer: 0, // Unit: layer
      info: '',
      pointSelected: [],
      edgeSelected: [],
      faceSelected: [],
    };

    this.ORIGAMI_VIEW_MIN_WIDTH = 400;
    this.ORIGAMI_VIEW_MAX_HEIGHT = 600;
    this.ORIGAMI_VIEW_RATIO = 3/4; // height/width
  }

  update = (state) => {
    this.setState(state);
  }

  // Get origami view dimension
  getDimension = ( ) => {
    if (this.state.shouldPortrait){
      return {
        width: this.state.width,
        height: this.state.width*this.ORIGAMI_VIEW_RATIO,
      };
    }

    // Landscape mode
    let w = this.state.width-600;
    // 600 is the width of tools
    // Use padding for child components
    let h = w*this.ORIGAMI_VIEW_RATIO;

    if (h > this.ORIGAMI_VIEW_MAX_HEIGHT){
      return {
        width: this.ORIGAMI_VIEW_MAX_HEIGHT/this.ORIGAMI_VIEW_RATIO,
        height: this.ORIGAMI_VIEW_MAX_HEIGHT,
      };
    }

    return {
      width: w,
      height: h,
    };
  }

  getLayout = () => {
    let dim = this.getDimension();
    return {
      ratio: dim.width/2,
      x: dim.width/2,
      y: dim.height/2+this.state.layer*this.state.space,
      angle: 0,
      isometric: true,
    }
  }

  updateWindowDimension = () => {
    console.log('Size', window.innerWidth, window.innerHeight)
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      shouldPortrait: window.innerWidth-600 < this.ORIGAMI_VIEW_MIN_WIDTH,
    });
  }

  componentDidMount() {
    this.updateWindowDimension();
    window.addEventListener('resize', this.updateWindowDimension);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimension);
  }

  renderLandscapeTools = () => {
    if(!this.state.shouldPortrait){
      return(
        <div style = {containerTools}>
          <FileView
            design = {this.design}
            update = {this.update}
          />
          <ViewView
            design = {this.design}
            step = {this.state.step}
            space = {this.state.space}
            layer = {this.state.layer}
            info = {this.state.info}
            update = {this.update}
          />
          <EditView
            design = {this.design}
            pointSelected = {this.state.pointSelected}
            faceSelected = {this.state.faceSelected}
            update = {this.update}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.state.width === 0){
      return null;
    }

    if (this.state.shouldPortrait){
      return(
        <div style = {containerPortrait}>
          <OrigamiView
            origami = {this.design.getOrigami(this.state.step)}
            dimension = {this.getDimension()}
            layout = {this.getLayout()}
            space = {this.state.space}
            layer = {this.state.layer}
            pointSelected = {this.state.pointSelected}
            edgeSelected = {this.state.edgeSelected}
            faceSelected = {this.state.faceSelected}
            update = {this.update}
          />
          <div style = {containerPortraitTools}>
            <EditView
              design = {this.design}
              pointSelected = {this.state.pointSelected}
              faceSelected = {this.state.faceSelected}
              update = {this.update}
            />
            <ViewView
              design = {this.design}
              step = {this.state.step}
              space = {this.state.space}
              layer = {this.state.layer}
              info = {this.state.info}
              update = {this.update}
            />
            <FileView
              design = {this.design}
              update = {this.update}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style = {container}>
          <div style = {containerTools}>
            <FileView
              design = {this.design}
              update = {this.update}
            />
            <ViewView
              design = {this.design}
              step = {this.state.step}
              space = {this.state.space}
              layer = {this.state.layer}
              info = {this.state.info}
              update = {this.update}
            />
            <EditView
              design = {this.design}
              pointSelected = {this.state.pointSelected}
              faceSelected = {this.state.faceSelected}
              update = {this.update}
            />
          </div>
          <OrigamiView
            origami = {this.design.getOrigami(this.state.step)}
            dimension = {this.getDimension()}
            layout = {this.getLayout()}
            space = {this.state.space}
            layer = {this.state.layer}
            pointSelected = {this.state.pointSelected}
            edgeSelected = {this.state.edgeSelected}
            faceSelected = {this.state.faceSelected}
            update = {this.update}
          />
        </div>
      );
    }

  }
}

const container = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
const containerTools = {
  width: 600,
  flex: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
const containerPortrait = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};
const containerPortraitTools = {
  width: '100%',
  flex: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'auto'
};
