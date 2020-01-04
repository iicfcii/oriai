import React, { Component } from 'react';

// Too much troubel to update origami view
export class ToolView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: '0',
      shouldShowAllLayers: 'ON',
    }

  }

  onLayerChange = (event) => {
    // console.log(event.target)
    let valStr = event.target.value;

    this.props.origami.showLayers([parseInt(valStr,10)]);

    this.setState({
      layer: valStr,
      shouldShowAllLayers: 'OFF',
    });
  }

  onShowAllLayerClick = () => {
    if (this.state.shouldShowAllLayers === 'OFF'){
      this.props.origami.changeAllLayerVisibility(true);
    } else {
      this.props.origami.showLayers([parseInt(this.state.layer,10)]);
    }

    this.setState({
      shouldShowAllLayers: this.state.shouldShowAllLayers === 'ON' ? 'OFF' : 'ON',
    })
  }

  renderOptions = () => {
    let options = [];
    let layers = this.props.origami.layers;
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
          {'Show all layers is '}
          <button onClick={this.onShowAllLayerClick}>{this.state.shouldShowAllLayers}</button>
        </div>
        <div>
          {'Select Layers: '}
          <select value={this.state.layer} onChange={this.onLayerChange}>
            {this.renderOptions()}
          </select>
        </div>
        <div>
          {'Steps: '}
          <button onClick={this.handleShowAllLayerClick}>Prev</button>
          { 6 + '/' + 10}
          <button onClick={this.handleShowAllLayerClick}>Next</button>
        </div>
      </div>
    );
  }
}
