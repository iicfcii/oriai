import React, { Component } from 'react';
import { Point } from '../Model/point'

export class SetEdgeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    return(
      <div>
        {'Along line '}
        <SetPointView
          id = {'p1'}
          point = {this.props.p1}
          editing = {this.props.editing}
          pointSelected = {this.props.pointSelected}
          update = {this.props.update}
          updateEdit = {this.props.updateEdit}/>
        {'to '}
        <SetPointView
          id = {'p2'}
          point = {this.props.p2}
          editing = {this.props.editing}
          pointSelected = {this.props.pointSelected}
          update = {this.props.update}
          updateEdit = {this.props.updateEdit}/>
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
    if (this.state.isInputting) return;
    this.props.update({pointSelected: []}); // Clear selection

    this.props.updateEdit({editing: this.state.isSelecting?null:this.props.id});

    this.setState({isSelecting: !this.state.isSelecting})
  }

  onInput = () => {
    if (this.state.isSelecting) return;

    let px = '';
    let py = '';

    if (!this.state.isInputting){
      // Start input
      if (this.props.point){
        px = this.props.point.x.toFixed(5);
        py = this.props.point.y.toFixed(5);
      }
    }

    this.props.updateEdit({editing: this.state.isInputting?null:this.props.id});

    this.setState({
      px: px,
      py: py,
      isInputting: !this.state.isInputting,
    })
  }


  onInputChange = (event, p) => {
    let x;
    let y;
    if (p === 'px'){
      x = parseFloat(event.target.value);
      y = parseFloat(this.state.py);
    } else if(p === 'py')  {
      x = parseFloat(this.state.px);
      y = parseFloat(event.target.value);
    } else {
      // wrong point
    }

    if (!isNaN(x) && !isNaN(y)){
      this.props.updateEdit({[this.props.id]: new Point(x, y)});
    } else {
      this.props.updateEdit({[this.props.id]: null});
    }

    this.setState({[p]: event.target.value});
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
    // Update state when props change and is selecting or inputting
    if (!this.state.isSelecting && !this.state.isInputting) return;

    if (this.props.editing !== this.props.id){
      this.props.update({pointSelected: []}); // Clear selection
      if(this.state.isSelecting) this.setState({isSelecting: !this.state.isSelecting,});
      if(this.state.isInputting) this.setState({isInputting: !this.state.isInputting,});
      return;
    }

    // Update selected point when selecting
    if (this.state.isSelecting){
      if (this.props.pointSelected.length === 1){
        if (this.props.point === null ||
            !this.props.pointSelected[0].isEqual(this.props.point)){
          this.props.updateEdit({[this.props.id]: this.props.pointSelected[0]});
        }
      }

      if (this.props.pointSelected.length > 1 || this.props.pointSelected.length === 0){
        if (this.props.point){
          this.props.updateEdit({[this.props.id]: null});
        }
      }
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
          onChange={(event) => {this.onInputChange(event, 'px')}}
          disabled = {this.state.isInputting?false:true}/>
        {', '}
        <input
          type="text"
          size="5"
          value={this.getPoint()[1]}
          onChange={(event) => {this.onInputChange(event, 'py')}}
          disabled = {this.state.isInputting?false:true}/>
        {') '}
        <button onClick={this.onSelect}>{this.state.isSelecting?'Finish':'Select'}</button>
        <button onClick={this.onInput}>{this.state.isInputting?'Finish':'Input'}</button>
      </div>
    );
  }
}
