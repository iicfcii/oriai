import React, { Component } from 'react';

export class ToolView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: '0',
    }

  }

  render() {
    const containerStyle = {
      height: 600,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white ',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    return (
      <div style = {containerStyle}>
        <div>Tools</div>
        <div>{'Total Faces: ' + this.props.origami.faces.length}</div>
        <div>{'Total Layers: ' + this.props.origami.layers}</div>
        <div>
          {'Select Layers: '}
          <select value={this.state.layer} onChange={this.handleOnLayerChange}>
            {this.renderOptions()}
          </select>
        </div>
      </div>
    );
  }
}
