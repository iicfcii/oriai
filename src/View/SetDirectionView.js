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
    if (this.state.isInputting){
      let directions = [];
      let valid = true;
      this.props.faceIDs.forEach((id) => {
        let direction = parseInt(this.state[id]);
        if (isNaN(direction)) {
          valid = false;
          directions.push(null);
        } else {
          directions.push(direction);
        }
      });

      this.props.updateEdit({directions: directions});

      if (!valid) console.log('Invalid input');
    } else {
      // Start input
      this.props.faceIDs.every((id, i) => {
        if (this.props.directions[i]){
          newState[id] = this.props.directions[i].toFixed(0);
        } else {
          newState[id] = '';
        }

      })
    }

    this.setState(newState);
  }

  onInputChange = (id, event) => {
    let newState = {};
    newState[id] = event.target.value;
    this.setState(newState);
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
