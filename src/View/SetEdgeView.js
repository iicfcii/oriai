import React, { Component } from 'react';
import { Point } from '../Model/point'

export class SetEdgeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canEditP1: true,
      canEditP2: true,
    }
  }

  render(){
    return(
      <div>
        {'Along line '}
        <SetPointView
          point = {this.props.p1}
          pointSelected = {this.props.pointSelected}
          canEdit = {this.state.canEditP1}
          setCanEditOther = {(canEdit) => {this.setState({canEditP2: canEdit})}}
          update = {this.props.update}
          updatePoint = {(point) => {this.props.updateEdit({p1: point});}}/>
        {'to '}
        <SetPointView
          point = {this.props.p2}
          pointSelected = {this.props.pointSelected}
          canEdit = {this.state.canEditP2}
          setCanEditOther = {(canEdit) => {this.setState({canEditP1: canEdit})}}
          update = {this.props.update}
          updatePoint = {(point) => {this.props.updateEdit({p2: point});}}/>
      </div>
    );
  }
}

class SetPointView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false,
      isInputting: false,
      px: '', // String
      py: '',
    }
  }

  onSelect = () => {
    if (this.state.isInputting || !this.props.canEdit) return;
    this.props.update({pointSelected: []}); // Clear selection

    this.props.setCanEditOther(this.state.isSelecting); // Not next isSelecting

    this.setState({
      isSelecting: !this.state.isSelecting,
    })
  }

  onInput = () => {
    if (this.state.isSelecting) return;

    let px = '';
    let py = '';

    if (this.state.isInputting){
      // Finish input
      let x = parseFloat(this.state.px);
      let y = parseFloat(this.state.py);

      if (!isNaN(x) && !isNaN(y)){
        this.props.updatePoint(new Point(x, y));
      } else {
        this.props.updatePoint(null);
      }
    } else {
      // Start input
      if (this.props.point){
        px = this.props.point.x.toFixed(5);
        py = this.props.point.y.toFixed(5);
      }
    }

    this.setState({
      px: px,
      py: py,
      isInputting: !this.state.isInputting,
    })
  }

  onPxChange = (event) => {
    // console.log(event.target.value)
    this.setState({px: event.target.value});
  }

  onPyChange = (event) => {
    // console.log(event.target.value)
    this.setState({py: event.target.value});
  }

  getPoint = () => {
    if (this.state.isInputting){
      return [this.state.px, this.state.py];
    }

    if (this.props.point){
      return [this.props.point.x.toFixed(5), this.props.point.y.toFixed(5)];
    }

    return ['','']
  }

  componentDidUpdate(){
    // Update state when props change
    if (!this.state.isSelecting) return;

    if (this.props.pointSelected.length === 1){
      if (this.props.point === null ||
          !this.props.pointSelected[0].isEqual(this.props.point))
      this.props.updatePoint(this.props.pointSelected[0]);
    }

    if (this.props.pointSelected.length > 1 || this.props.pointSelected.length === 0){
      if (this.props.point) this.props.updatePoint(null);
    }
  }

  render(){
    return(
      <div>
        {'('}
        <input
          type="text"
          size="5"
          value={this.getPoint()[0]}
          onChange={this.onPxChange}
          disabled = {this.state.isInputting?false:true}/>
        {', '}
        <input
          type="text"
          size="5"
          value={this.getPoint()[1]}
          onChange={this.onPyChange}
          disabled = {this.state.isInputting?false:true}/>
        {') '}
        <button onClick={this.onSelect}>{this.state.isSelecting?'Finish':'Select'}</button>
        <button onClick={this.onInput}>{this.state.isInputting?'Finish':'Input'}</button>
      </div>
    );
  }
}
