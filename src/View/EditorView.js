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

    this.state = {
      width: 0, // Window dimension
      height: 0,
      shouldPortrait: false,
      // Most mobile devices will be portrait mode
      // even device is in landscape mode
      step: this.design.origamis.length-1,
      isometric: true,
      space: 0,
      layer: 0, // Unit: layer
      info: '',
      hideUnselectedFaces: false,
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
      isometric: this.state.isometric,
    }
  }

  updateWindowDimension = () => {
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

  render() {
    if (this.state.width === 0){
      // Render nothing if width of window not ready
      // Otherwise, width of window may be wrong
      return null;
    }

    let origamiView = (
      <OrigamiView
        origami = {this.design.getOrigami(this.state.step)}
        dimension = {this.getDimension()}
        layout = {this.getLayout()}
        space = {this.state.space}
        layer = {this.state.layer}
        hideUnselectedFaces = {this.state.hideUnselectedFaces}
        pointSelected = {this.state.pointSelected}
        edgeSelected = {this.state.edgeSelected}
        faceSelected = {this.state.faceSelected}
        update = {this.update}
      />
    );
    let fileView = (
      <FileView
        design = {this.design}
        update = {this.update}
      />
    );
    let editView = (
      <EditView
        design = {this.design}
        pointSelected = {this.state.pointSelected}
        faceSelected = {this.state.faceSelected}
        update = {this.update}
      />
    );
    let viewView = (
      <ViewView
        design = {this.design}
        step = {this.state.step}
        space = {this.state.space}
        layer = {this.state.layer}
        info = {this.state.info}
        isometric = {this.state.isometric}
        hideUnselectedFaces = {this.state.hideUnselectedFaces}
        update = {this.update}
      />
    );

    if (this.state.shouldPortrait){
      return(
        <div style = {containerPortrait}>
          {origamiView}
          <div style = {containerPortraitTools}>
            {fileView}
            {editView}
            {viewView}
          </div>
        </div>
      );
    } else {
      return (
        <div style = {container}>
          <div style = {containerTools}>
            {fileView}
            {viewView}
            {editView}
          </div>
          {origamiView}
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
