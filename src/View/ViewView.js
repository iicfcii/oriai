import React, { Component } from 'react';

export class ViewView extends Component {
  constructor(props) {
    super(props);
  }

  onPrevStep = () => {
    if (this.props.step > 0){
      this.props.update({
        step: this.props.step - 1,
        layer: 0,
      });
    }
  }

  onNextStep = () => {
    if (this.props.step < this.props.design.origamis.length - 1){
      this.props.update({
        step: this.props.step + 1,
        layer: 0,
      });
    }
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

  getDescription = () => {
    let step = this.props.design.getStep(this.props.step);
    if (step) return step.getDescription();

    return '';
  }

  render() {
    return(
      <div style = {container}>
        <div style = {containerRow}><b>View</b></div>
        <div style = {containerRow}>{'Info: ' + this.props.info}</div>
        <div style = {containerRow}>{'Total Faces: ' + this.props.design.getOrigami(this.props.step).faces.length}</div>
        <div style = {containerRow}>{'Total Layers: ' + this.props.design.getOrigami(this.props.step).layers}</div>
        <div style = {containerRow}>
          {'Steps: '}
          <button onClick={this.onPrevStep}>Prev</button>
          {this.props.step.toFixed(0) + '/' + (this.props.design.origamis.length-1).toFixed(0)}
          <button onClick={this.onNextStep}>Next</button>
        </div>
        <div style = {containerRow}>
          {'Layer space: '}
          <input type="range" min="0" max="50" value={this.props.space} step="10" onChange={this.onSpaceChange}/>
          {' ' + this.props.space}
        </div>
        <div style = {containerRow}>
          {'Layer offset: '}
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
          {'Next step: '}
          {this.getDescription()}
        </div>
      </div>
    );
  }
}

const container = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white ',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'auto'
};

const containerRow = {
  margin: '10px 0px',
};
