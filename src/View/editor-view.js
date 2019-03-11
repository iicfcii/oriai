import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Origami } from '../Model/origami';
import { OrigamiView } from './origami-view';
import { ToolView } from './tool-view';
import { InfoView } from './tool-view';

export class EditorView extends Component {
  constructor(props) {
    super(props);
    this.origami = new Origami();
    // console.log(this.origami.faces);
    this.scale = 400;
    this.w = 600;
    this.h = 600;

    this.state = {
      layer: '0',
      showAllLayers: 'ON',
    }

    this.handleOnLayerChange = (event) => {
      // console.log(event.target)
      let valStr = event.target.value;

      this.origami.showLayers([parseInt(valStr)]);

      this.setState({
        layer: valStr,
        showAllLayers: 'OFF',
      });
    }

    this.handleShowAllLayerClick = () => {
      if (this.state.showAllLayers === 'OFF'){
        this.origami.changeAllLayerVisibility(true);
      } else {
        this.origami.showLayers([parseInt(this.state.layer)]);
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
          <Stage width={this.w} height={this.h}>
            <Layer>
              <Rect
                x = {0}
                y = {0}
                width = {this.w}
                height = {this.h}
                fill = '#d9d9d9'>
              </Rect>
            </Layer>
            <OrigamiView
              origami = {this.origami}
              offset = {{
                x: this.w/2-this.scale/2,
                y: this.h/2-this.scale/2
              }}
              scaleValue = {this.scale}/>
          </Stage>
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
