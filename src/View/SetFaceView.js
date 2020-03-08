import React, { Component } from 'react';

export class SetFaceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectingFace: false,
    }
  }

  onSelectFace = () => {
    this.props.update({faceSelected: []}); // Clear selection
    this.setState({
      isSelectingFace: !this.state.isSelectingFace,
    })
  }

  componentDidUpdate(){
    // Update state when props change
    if (this.state.isSelectingFace){
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

  }

  render(){
    return(
      <div>
        {'Face ' + this.props.faceIDs}
        <button onClick={this.onSelectFace}>{this.state.isSelectingFace?'Finish':'Select'}</button>
      </div>
    );
  }
}
