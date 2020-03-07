import React, { Component } from 'react';
import { Point } from '../Model/point'
import { SelectEdgeView } from './SelectEdgeView'

export class EditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Crease',
    }

    // Not owned by this component
    // Only reflecting changes
    this.faceIDs = [];

    // Will be updated by child
    this.p1 = null;
    this.p2 = null;
  }

  onTypeChange = () => {
    if (this.state.type === 'Crease'){
      this.setState({type: 'Fold'})
    }
    if (this.state.type === 'Fold'){
      this.setState({type: 'Crease'})
    }
  }

  onSelectFace = () => {
    this.props.update({faceSelected: []}); // Clear selection
    this.setState({
      isSelectingFace: !this.state.isSelectingFace,
    })
  }

  updateFaceSelected = () => {
    // Updates every time props change
    if (this.state.isSelectingFace){
      let faceIDs = [];
      this.props.faceSelected.forEach((face) => {
        faceIDs.push(face.id);
      });
      this.faceIDs = faceIDs;
    }
  }

  renderDirections = () => {
    if(this.state.type === 'Fold'){
      let inputs = [];
      this.faceIDs.forEach((id, i) => {
        inputs.push(
          <span key={id}>
            <input type="text" size="5"/>
            {i === this.faceIDs.length-1?'':', '}
          </span>
        );
      });

      return (
        <div style = {containerRow}>
          {'Up '}
          {inputs}
          {' layers'}
        </div>
      );
    }

    return null;
  }

  render() {
    this.updateFaceSelected();

    return(
      <div style = {container}>
        <div style = {containerRow}>
        <b>{'Edit'}</b>
        </div>
        <div style = {containerRow}>
          <button onClick={null}>Save</button>
          <button onClick={null}>Load</button>
        </div>
        <div style = {containerRow}>
          {'Title: '}
          <input type="text" size="10"/>
        </div>
        <div style = {containerRow}>
          <button onClick={this.onTypeChange}>{this.state.type}</button>
        </div>
        <div style = {containerRow}>
          {'Faces ' + this.faceIDs + ' '}
          <button onClick={this.onSelectFace}>{this.state.isSelectingFace?'Finish':'Select'}</button>
        </div>
        <div style = {containerRow}>
          <SelectEdgeView
            pointSelected = {this.props.pointSelected}
            update = {this.props.update}
            setP1 = {(p) => {this.p1 = p;}}
            setP2 = {(p) => {this.p2 = p;}}/>
        </div>
        {this.renderDirections()}
        <div style = {containerRow}>
          <button onClick={null}>Add Step</button>
        </div>
        <div style = {containerRow}>
          <button onClick={null}>Delete Last Step</button>
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
