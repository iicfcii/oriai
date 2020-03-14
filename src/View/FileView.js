import React, { Component } from 'react';
import Dog from '../Examples/Dog.json';
import Cicada from '../Examples/Cicada.json';
import Crane from '../Examples/Crane.json';
import RabbitEarFold from '../Examples/RabbitEarFold.json';
import Blank from '../Examples/Blank.json';

import { Point } from '../Model/Point';
import { Crease } from '../Model/Crease';
import { Fold } from '../Model/Fold';
import { Edge } from '../Model/Edge';

const examples = {
  Dog: Dog,
  Cicada: Cicada,
  Crane: Crane,
  RabbitEarFold: RabbitEarFold,
  Blank: Blank,
}

export class FileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      creator: '',
      email: '',
      designer: '',
      json: '',
      example: '',
    }
  }

  update = (example) => {
    this.props.update({
      step: this.props.design.origamis.length-1,
      pointSelected: [],
      edgeSelected: [],
      faceSelected: [],
    });

    let getText = (text) => {
      return text?text:'';
    }

    this.setState({
      name: getText(this.props.design.name),
      creator: getText(this.props.design.creator),
      email: getText(this.props.design.email),
      designer: getText(this.props.design.designer),
      json: this.props.design.save(),
      example: example,
    });
  }

  onExample = (event) => {
    let example = event.target.value;
    if (example === 'Upload') return; // Upload is not selectable
    this.props.design.load(examples[example]);

    this.update(example);
  }

  onSave = () => {
    this.setState({json: this.props.design.save()});
  }

  onFile = (event) => {
    let reader = new FileReader();
    reader.onload = () => {
      this.props.design.load(JSON.parse(reader.result));
      this.update('Upload');
    };

    if (event.target.files[0]) reader.readAsText(event.target.files[0]);
  }

  onName = (event) => {
    let name = event.target.value;
    this.props.design.name = name;
    this.setState({name: name});
  }

  onCreator = (event) => {
    let creator = event.target.value;
    this.props.design.creator = creator;
    this.setState({creator: creator});
  }

  onEmail = (event) => {
    let email = event.target.value;
    this.props.design.email = email;
    this.setState({email: email});
  }

  onDesigner = (event) => {
    let designer = event.target.value;
    this.props.design.designer = designer;
    this.setState({designer: designer});
  }

  componentDidMount(){
    let example = 'Dog';
    this.props.design.load(examples[example]);
    this.update(example);
  }

  render(){
    return(
      <div style = {container}>
        <div style = {containerRow}>
          <b>File</b>
        </div>
        <div style = {containerRow}>
          {'Examples '}
          <select
            value={this.state.example}
            onChange={this.onExample}>
            <option value='Dog'>Dog</option>
            <option value='Cicada'>Cicada</option>
            <option value='Crane'>Crane</option>
            <option value='RabbitEarFold'>Rabbit Ear Fold</option>
            <option value='Blank'>Blank</option>
            <option value='Upload'>Upload</option>
          </select>
        </div>
        <div style = {containerRow}>
          <a
            href={'data:text/plain;charset=utf-8,'+encodeURIComponent(this.props.design.save())}
            download={this.props.design.name + '.json'}>
            <span onClick={this.onSave}>
              Save
            </span>
          </a>
        </div>
        <div style = {containerRow}>
          <input
            type="file"
            style={{width: 180}}
            onChange={this.onFile}/>
        </div>
        <div style = {containerRow}>
          {'Name '}
          <input
            type="text"
            size="10"
            value={this.state.name}
            onChange={this.onName}/>
        </div>
        <div style = {containerRow}>
          {'Creator '}
          <input
            type="text"
            size="10"
            value={this.state.creator}
            onChange={this.onCreator}/>
        </div>
        <div style = {containerRow}>
          {'Email '}
          <input
            type="text"
            size="10"
            value={this.state.email}
            onChange={this.onEmail}/>
        </div>
        <div style = {containerRow}>
          {'Designer '}
          <input
            type="text"
            size="10"
            value={this.state.designer}
            onChange={this.onDesigner}/>
        </div>
        <div style = {containerRow}>
          {'JSON '}<br></br>
          <textarea
            style={textArea}
            value={this.state.json}
            readOnly={true}/>
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

const textArea = {
  resize: 'none',
  width: 180,
  height: 200,
}
