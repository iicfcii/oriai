import React, { Component } from 'react';

export class SetDirectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputting: false,
      // id: direction(String)
      // id: direction
      // ...
    }
  }

  onInput = () => {
    let newState = {
      isInputting: !this.state.isInputting,
    };
    if (!this.state.isInputting){
      // Start input
      this.props.faceIDs.every((id, i) => {
        if (this.props.directions[i]){
          newState[id] = this.props.directions[i].toFixed(0);
        } else {
          newState[id] = '';
        }
      })
    }

    this.props.updateEdit({
      editing: this.state.isInputting?null:'direction',
    });
    this.setState(newState);
  }

  onInputChange = (id, event) => {
    // Update
    let directions = [];
    this.props.faceIDs.forEach((faceID, i) => {
      let direction;
      if (faceID !== id) {
        direction = parseInt(this.state[faceID]);
      } else {
        // Use value because state not udpated yet
        direction = parseInt(event.target.value);
      }
      if (isNaN(direction)) {
        directions.push(null);
      } else {
        directions.push(direction);
      }
    });

    this.props.updateEdit({directions: directions});

    this.setState({[id]:event.target.value});
  }

  getDirection = (id, i) => {
    if (this.state.isInputting){
      return this.state[id];
    }

    if (this.props.directions[i]){
      return this.props.directions[i].toFixed(0);
    }

    return '';
  }

  componentDidUpdate(){
    if (!this.state.isInputting) return;

    if (this.props.editing !== 'direction'){
      // this.finishInput();
      this.setState({isInputting: !this.state.isInputting});
      return;
    }
  }

  render(){
    let inputs = [];
    this.props.faceIDs.forEach((id, i) => {
      inputs.push(
        <span key={id}>
          <input
            type="text"
            size="5"
            value={this.getDirection(id, i)}
            onChange={(event)=>{this.onInputChange(id, event);}}
            disabled = {this.state.isInputting?false:true}/>
          {i === this.props.faceIDs.length-1?'':', '}
        </span>
      );
    });

    return(
      <div>
        {'Up '}
        {inputs}
        {' layers'}
        <button onClick={this.onInput}>{this.state.isInputting?'Finish':'Input'}</button>
      </div>
    );
  }
}
