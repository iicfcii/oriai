import React, { Component } from 'react';
import { Edge } from '../Model/edge'
import { Crease } from '../Model/crease'
import { SetFaceView } from './SetFaceView'
import { SetEdgeView } from './SetEdgeView'
import { SetDirectionView } from './SetDirectionView'

export class EditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Fold',
      faceIDs: [],
      p1: null,
      p2: null,
      directions: [], // Relate to faceIDs
    }

  }

  onTypeChange = () => {
    if (this.state.type === 'Crease'){
      this.setState({type: 'Fold'})
    }
    if (this.state.type === 'Fold'){
      this.setState({type: 'Crease'})
    }
  }

  onAddStep = () => {
    if (this.state.type === 'Crease'){
      // Check selections are all set
      if (this.state.faceIDs.length > 0 &&
          this.state.p1 !== null &&
          this.state.p2 !== null){
        // Add step
        let step = new Crease(this.state.faceIDs, new Edge(this.state.p1, this.state.p2));
        this.props.design.addStep(step);

        // Update steps
        this.props.update({
          step: this.props.design.origamis.length-1,
        });
        // Reset selections
        this.setState({
          faceIDs: [],
          p1: null,
          p2: null,
        });
      } else {
        console.log('Not fully defined');
      }
    }
  }

  renderDirections = () => {
    if(this.state.type === 'Crease') return null;

    return (
      <div style = {containerRow}>
        <SetDirectionView
          faceIDs = {this.state.faceIDs}
          directions = {this.state.directions}
          update = {this.props.update}
          updateEdit = {this.updateEdit}/>
      </div>
    );
  }

  updateEdit = (state) => {
    this.setState(state);
  }

  render() {
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
          <SetFaceView
            faceIDs = {this.state.faceIDs}
            faceSelected = {this.props.faceSelected}
            update = {this.props.update}
            updateEdit = {this.updateEdit}/>
        </div>
        <div style = {containerRow}>
          <SetEdgeView
            p1 = {this.state.p1}
            p2 = {this.state.p2}
            pointSelected = {this.props.pointSelected}
            update = {this.props.update}
            updateEdit = {this.updateEdit}/>
        </div>
        {this.renderDirections()}
        <div style = {containerRow}>
          <button onClick={this.onAddStep}>Add Step</button>
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
