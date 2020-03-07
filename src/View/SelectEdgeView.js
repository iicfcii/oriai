import React, { Component } from 'react';
import { Point } from '../Model/point'

export class SelectEdgeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectingP1: false,
      isInputtingP1: false,
      isSelectingP2: false,
      isInputtingP2: false,
      p1x: '', // String
      p1y: '',
      p2x: '',
      p2y: '',
    }

    // Not owned by this component
    // Only reflecting changes
    this.p1 = null;
    this.p2 = null;
  }

  onSelectP1 = () => {
    if (this.state.isInputtingP1 || this.state.isSelectingP2) return;
    this.props.update({pointSelected: []}); // Clear selection
    this.setState({
      isSelectingP1: !this.state.isSelectingP1,
    })
  }

  onSelectP2 = () => {
    if (this.state.isInputtingP2 || this.state.isSelectingP1) return;
    this.props.update({pointSelected: []}); // Clear selection
    this.setState({
      isSelectingP2: !this.state.isSelectingP2,
    })
  }

  onInputP1 = () => {
    if (this.state.isSelectingP1) return;

    let px = '';
    let py = '';

    if (this.state.isInputtingP1){
      // Finish input
      let x = parseFloat(this.state.p1x);
      let y = parseFloat(this.state.p1y);

      if (!isNaN(x) && !isNaN(y)){
        this.p1 = new Point(x, y);
        this.props.setP1(this.p1);
      } else {
        this.p1 = null;
        this.props.setP1(null);
      }
    } else {
      // Start input
      if (this.p1){
        px = this.p1.x.toFixed(5);
        py = this.p1.y.toFixed(5);
      }
    }

    this.setState({
      p1x: px,
      p1y: py,
      isInputtingP1: !this.state.isInputtingP1,
    })
  }

  onInputP2 = () => {
    if (this.state.isSelectingP2) return;

    let px = '';
    let py = '';

    if (this.state.isInputtingP2){
      // Finish input
      let x = parseFloat(this.state.p2x);
      let y = parseFloat(this.state.p2y);

      if (!isNaN(x) && !isNaN(y)){
        this.p2 = new Point(x, y);
        this.props.setP2(this.p2);
      } else {
        this.p2 = null;
        this.props.setP2(null);
      }
    } else {
      // Start input
      if (this.p2){
        px = this.p2.x.toFixed(5);
        py = this.p2.y.toFixed(5);
      }
    }

    this.setState({
      p2x: px,
      p2y: py,
      isInputtingP2: !this.state.isInputtingP2,
    })
  }

  onP1XChange = (event) => {
    // console.log(event.target.value)
    this.setState({p1x: event.target.value});
  }

  onP2XChange = (event) => {
    // console.log(event.target.value)
    this.setState({p2x: event.target.value});
  }

  onP1YChange = (event) => {
    // console.log(event.target.value)
    this.setState({p1y: event.target.value});
  }

  onP2YChange = (event) => {
    // console.log(event.target.value)
    this.setState({p2y: event.target.value});
  }

  getP1 = () => {
    if (this.state.isInputtingP1){
      return [this.state.p1x, this.state.p1y];
    }

    if (this.p1){
      return [this.p1.x.toFixed(5), this.p1.y.toFixed(5)];
    }

    return ['','']
  }

  getP2 = () => {
    if (this.state.isInputtingP2){
      return [this.state.p2x, this.state.p2y];
    }

    if (this.p2){
      return [this.p2.x.toFixed(5), this.p2.y.toFixed(5)];
    }

    return ['','']
  }

  updateP1Selected = () => {
    if (!this.state.isSelectingP1) return;
    // Updates every time props change
    if (this.props.pointSelected.length === 1){
      this.p1 = this.props.pointSelected[0];
    }

    if (this.props.pointSelected.length > 1 || this.props.pointSelected.length === 0){
      this.p1 = null;
    }

    this.props.setP1(this.p1);
  }

  updateP2Selected = () => {
    if (!this.state.isSelectingP2) return;
    // Updates every time props change
    if (this.props.pointSelected.length === 1){
      this.p2 = this.props.pointSelected[0];
    }

    if (this.props.pointSelected.length > 1 || this.props.pointSelected.length === 0){
      this.p2 = null;
    }

    this.props.setP2(this.p2);
  }

  render(){
    this.updateP1Selected();
    this.updateP2Selected();

    return(
      <div>
        {'Along line ('}
        <input
          type="text"
          size="5"
          value={this.getP1()[0]}
          onChange={this.onP1XChange}
          disabled = {this.state.isInputtingP1?false:true}/>
        {', '}
        <input
          type="text"
          size="5"
          value={this.getP1()[1]}
          onChange={this.onP1YChange}
          disabled = {this.state.isInputtingP1?false:true}/>
        {') '}
        <button onClick={this.onSelectP1}>{this.state.isSelectingP1?'Finish':'Select'}</button>
        <button onClick={this.onInputP1}>{this.state.isInputtingP1?'Finish':'Input'}</button>
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {'to ('}
        <input
          type="text"
          size="5"
          value={this.getP2()[0]}
          onChange={this.onP2XChange}
          disabled = {this.state.isInputtingP2?false:true}/>
        {', '}
        <input
          type="text"
          size="5"
          value={this.getP2()[1]}
          onChange={this.onP2YChange}
          disabled = {this.state.isInputtingP2?false:true}/>
        {') '}
        <button onClick={this.onSelectP2}>{this.state.isSelectingP2?'Finish':'Select'}</button>
        <button onClick={this.onInputP2}>{this.state.isInputtingP2?'Finish':'Input'}</button>
      </div>
    );
  }
}
