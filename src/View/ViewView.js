import React, { Component } from 'react';

export class ViewView extends Component {
  constructor(props) {
    super(props);
  }

  onStepChange = (event) => {
    let step = parseInt(event.target.value);
    // Scale vertical offset with space
    this.props.update({
      step:step,
      pointSelected: [],
      edgeSelected: [],
      faceSelected: [],
    });
  }

  onSpaceChange = (event) => {
    let space = parseInt(event.target.value);
    // Scale vertical offset with space
    this.props.update({
      space:space,
    });
  }

  onLayerOffsetChange = (event) => {
    this.props.update({layer:parseInt(event.target.value)});
  }

  onHideChange = () => {
    this.props.update({
      hideUnselectedFaces: !this.props.hideUnselectedFaces,
    })
  }

  onViewChange = () => {
    this.props.update({
      isometric: !this.props.isometric,
    })
  }

  getDescription = () => {
    let step = this.props.design.getStep(this.props.step);
    if (step) return step.getDescription();

    return '';
  }

  render() {
    return(
      <div style = {container}>
        <div style = {containerRow}><b>View</b></div>
        <div style = {containerRow}>
          {'Info ' + this.props.info}
          </div>
        <div style = {containerRow}>
          {'Total Faces ' + this.props.design.getOrigami(this.props.step).faces.length}
        </div>
        <div style = {containerRow}>
          {'Total Layers ' + this.props.design.getOrigami(this.props.step).layers.length}
        </div>
        <div style = {containerRow}>
          {'View '}
          <button onClick={this.onViewChange}>
            {this.props.isometric?'Isometric':'Top'}
          </button>
        </div>
        <div style = {containerRow}>
          {'Steps '}
          <br/>
          <input
            type="range"
            min={0}
            max={this.props.design.origamis.length - 1}
            value={this.props.step}
            step="1"
            onChange={this.onStepChange}/>
            {' ' + this.props.step}
        </div>
        <div style = {containerRow}>
          {'Layer space '}
          <br/>
          <input
            type="range"
            min="0"
            max="200"
            value={this.props.space}
            step="10"
            onChange={this.onSpaceChange}/>
          {' ' + this.props.space}
        </div>
        <div style = {containerRow}>
          {'Layer offset '}
          <br/>
          <input
            type="range"
            min={0}
            max={this.props.design.getOrigami(this.props.step).maxLayer}
            value={this.props.layer}
            step={1}
            onChange={this.onLayerOffsetChange}/>
            {' ' + this.props.layer}
        </div>
        <div style = {containerRow}>
          {'Hide Unselected faces'}
          <br/>
          <button onClick={this.onHideChange}>
            {this.props.hideUnselectedFaces?'Yes':'No'}
          </button>
        </div>
        <div style = {containerRow}>
          {'Next step '}
          {this.getDescription()}
        </div>
      </div>
    );
  }
}

const container = {
  width: 200,
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white ',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

const containerRow = {
  margin: '10px 0px',
};
