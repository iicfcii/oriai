import React, { Component } from 'react';

export class EditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Crease',
      isAddingFace: false,
    }

    this.faceIDs = [];
  }

  onTypeChange = () => {
    if (this.state.type === 'Crease'){
      this.setState({type: 'Fold'})
    }
    if (this.state.type === 'Fold'){
      this.setState({type: 'Crease'})
    }
  }

  onAddFace = () => {
    this.props.update({faceSelected: []}); // Clear selection
    this.setState({
      isAddingFace: !this.state.isAddingFace,
    })
  }

  getFaceSelected = () => {
    // Updates every time props change
    if (this.state.isAddingFace){
      let faceIDs = [];
      this.props.faceSelected.forEach((face) => {
        faceIDs.push(face.id);
      });
      this.faceIDs = faceIDs;
    }

    return this.faceIDs;
  }


  renderDirections = () => {
    if(this.state.type === 'Fold'){
      let inputs = [];
      this.faceIDs.forEach((id, i) => {
        inputs.push(
          <span>
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
          {'Faces ' + this.getFaceSelected() + ' '}
          <button onClick={this.onAddFace}>{this.state.isAddingFace?'Finish':'Add'}</button>
          <button onClick={this.onDeleteFace}>Delete</button>
        </div>
        <div style = {containerRow}>
          {'Along line ('}
          <input type="text" size="5"/>
          {', '}
          <input type="text" size="5"/>
          {') to ('}
          <input type="text" size="5"/>
          {', '}
          <input type="text" size="5"/>
          {') '}
          <button onClick={null}>{'Select'}</button>
          <button onClick={null}>Delete</button>
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
