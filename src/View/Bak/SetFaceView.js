import React, { Component } from 'react';

export class SetFaceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false,
    }
  }

  onSelectFace = () => {
    this.props.update({
      faceSelected: [],  // Clear selection
    });

    this.props.updateEdit({
      editing: this.state.isSelecting?null:'face',
    })

    this.setState({
      isSelecting: !this.state.isSelecting,
    })
  }

  componentDidUpdate(){
    // Update state when props change
    if (!this.state.isSelecting) return;

    if (this.props.editing !== 'face'){
      this.props.update({
        faceSelected: [],  // Clear selection
      });
      this.setState({
        isSelecting: !this.state.isSelecting,
      });
      return;
    }

    let faceIDs = [];
    this.props.faceSelected.forEach((face) => {
      faceIDs.push(face.id);
    });
    let isEqual = (this.props.faceIDs.length === faceIDs.length) &&
                  this.props.faceIDs.every((id, i) => {return faceIDs[i] === id;});
    if (!isEqual){
      this.props.updateEdit({faceIDs: faceIDs});
    }
  }

  render(){
    return(
      <div>
        {'Face ' + this.props.faceIDs}
        <button onClick={this.onSelectFace}>{this.state.isSelecting?'Finish':'Select'}</button>
      </div>
    );
  }
}
