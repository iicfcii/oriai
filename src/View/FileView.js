import React, { Component } from 'react';

export class FileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      creator: '',
      email: '',
      designer: '',
      json: '',
    }
  }

  onSave = () => {
    this.setState({json: this.props.design.save()});
  }

  onFile = (event) => {
    let reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this.props.design.load(reader.result);
      this.props.update({step: this.props.design.origamis.length-1});

      let getText = (text) => {
        return text?text:'';
      }

      this.setState({
        name: getText(this.props.design.name),
        creator: getText(this.props.design.creator),
        email: getText(this.props.design.email),
        designer: getText(this.props.design.designer),
        json: this.props.design.save(),
      });
    };

    reader.readAsText(event.target.files[0]);
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

  render(){
    return(
      <div style = {container}>
        <div style = {containerRow}>
          <b>File</b>
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
            rows="20"
            cols="40"
            value={this.state.json}
            readOnly={true}/>
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

const textArea = {
  resize: 'none',
}
