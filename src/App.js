import React, { Component, useState } from "react";
import { EditorView } from './View/EditorView';
import { AboutView } from './View/AboutView';
import { ContactView } from './View/ContactView';
import { Box, Grommet } from 'grommet';
import { Theme, Button, Choose, Toggle, TextInputLine, Slider, Select } from './View/Style';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      checked: false,
      value: 10,
      select: 'Select',
    }
  }

  render() {
    return (
      <Grommet theme={Theme} full>
        <Box fill={true} gap='medium'>
          <Button
            onClick={() => {console.log('clicked')}}
            label={'Save too long'}/>
          <Box
            direction='row'
            gap='medium'
            width='large'>
            <Toggle
              value={this.state.checked}
              onChange={(checked) => {
                this.setState({checked: checked});
              }}/>
            <Choose
              value={!this.state.checked}
              onClick={(checked) => {
                this.setState({checked: !checked});
              }}/>
          </Box>
          <Box
            direction='row'
            gap='medium'
            width='xlarge'>
            <TextInputLine
              disabled={false}
              value={this.state.text}
              placeholder='type here'
              onChange={(event) => {
                this.setState({text:event.target.value});
              }}/>
            <TextInputLine
              disabled={false}
              value={this.state.text}
              placeholder='type here'
              onChange={(event) => {
                this.setState({text:event.target.value});
              }}/>
            <TextInputLine
              disabled={true}
              value={this.state.text}
              placeholder=''
              onChange={(event) => {
                this.setState({text:event.target.value});
              }}/>
          </Box>
          <Box
            direction='row'
            gap='medium'
            width='xlarge'>
            <Slider
              min={0}
              max={100}
              step={10}
              value={this.state.value}
              onChange={(value) => {
                this.setState({value:value});
              }}/>
            <Slider
              min={0}
              max={100}
              step={10}
              value={100-this.state.value}
              onChange={(value) => {
                this.setState({value:100-value});
              }}/>
          </Box>
          <Box
            direction='row'
            gap='medium'>
            <Select
              label={this.state.select}
              options={['Select','Line', 'Bisector', 'Endpoint']}
              onClick={(label)=>{this.setState({select:label});}}/>
            <Select
              label={this.state.select}
              options={['Select','Line', 'Bisector', 'Endpoint']}
              onClick={(label)=>{this.setState({select:label});}}/>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
