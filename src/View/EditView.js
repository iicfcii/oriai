import React, { Component } from 'react';
import { Edge } from '../Model/Edge';
import { Crease } from '../Model/Crease';
import { Fold } from '../Model/Fold';
import { SetFaceView } from './SetFaceView';
import { SetEdgeView } from './SetEdgeView';
import { SetDirectionView } from './SetDirectionView';

export class EditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Crease',
      faceIDs: [],
      p1: null,
      p2: null,
      directions: [], // Relate to faceIDs
      editing: null,
      result: '',
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
        let step = new Crease(this.state.faceIDs,
                              new Edge(this.state.p1, this.state.p2));
        let result = this.props.design.addStep(step);

        if (!step.isSuccessful(result)){
          this.setState({result: step.getResult(result)});
          return;
        }
        // Update steps
        this.props.update({
          step: this.props.design.origamis.length-1,
        });
        // Reset selections
        this.setState({
          faceIDs: [],
          p1: null,
          p2: null,
          directions: [],
          editing: null,
          result: step.getResult(result),
        });
      } else {
        this.setState({
          editing: null,
          result: 'Step not fully defined'
        });
      }
    }

    if (this.state.type === 'Fold'){
      // Check selections are all set
      let isDirectionDefined = this.state.faceIDs.length === this.state.directions.length &&
                               this.state.directions.every((direction) => {return direction !== null});
      if (this.state.faceIDs.length > 0 &&
          this.state.p1 !== null &&
          this.state.p2 !== null &&
          isDirectionDefined){
        // Add step
        let step = new Fold(this.state.faceIDs,
                            new Edge(this.state.p1, this.state.p2),
                            this.state.directions);
        let result = this.props.design.addStep(step);

        if (!step.isSuccessful(result)){
          this.setState({result: step.getResult(result)});
          return;
        }
        // Update steps
        this.props.update({
          step: this.props.design.origamis.length-1,
        });
        // Reset selections
        this.setState({
          faceIDs: [],
          p1: null,
          p2: null,
          directions: [],
          editing: null,
          result: step.getResult(result),
        });
      } else {
        this.setState({
          editing: null,
          result: 'Step not fully defined'
        });
      }
    }
  }

  onRemoveLastStep = () => {
    this.props.design.removeLastStep();
    this.props.update({
      step: this.props.design.origamis.length-1,
    });
  }

  renderDirections = () => {
    if(this.state.type === 'Crease') return null;

    return (
      <div style = {containerRow}>
        <SetDirectionView
          editing = {this.state.editing}
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

  onSave = () => {
  }

  onLoad = () => {

  }

  render() {
    return(
      <div style = {container}>
        <div style = {containerRow}>
          <b>{'Edit'}</b>
        </div>
        <div style = {containerRow}>
          <button onClick={this.onTypeChange}>{this.state.type}</button>
        </div>
        <div style = {containerRow}>
          <SetFaceView
            editing = {this.state.editing}
            faceIDs = {this.state.faceIDs}
            faceSelected = {this.props.faceSelected}
            update = {this.props.update}
            updateEdit = {this.updateEdit}/>
        </div>
        <div style = {containerRow}>
          <SetEdgeView
            editing = {this.state.editing}
            p1 = {this.state.p1}
            p2 = {this.state.p2}
            pointSelected = {this.props.pointSelected}
            update = {this.props.update}
            updateEdit = {this.updateEdit}/>
        </div>
        {this.renderDirections()}
        <div style = {containerRow}>
          <button onClick={this.onAddStep}>Add Step</button>
          {' ' + this.state.result}
        </div>
        <div style = {containerRow}>
          <button onClick={this.onRemoveLastStep}>Delete Last Step</button>
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
