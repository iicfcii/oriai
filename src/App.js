import React, { Component, useState } from "react";
import { EditorView } from './View/EditorView';
import { AboutView } from './View/AboutView';
import { ContactView } from './View/ContactView';
import { Box, Grommet } from 'grommet';
import { Theme, Button, Choose, Toggle, TextInputLine } from './View/Style';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      checked: false,
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
              defaultValue={this.state.checked}
              onChange={(checked) => {
                console.log('Toggle changes', checked)
                this.setState({checked: checked});
              }}/>
            <Choose
              defaultValue={!this.state.checked}
              onClick={(checked) => {
                console.log('Choose changes', checked)
                this.setState({checked: !checked});
              }}/>
          </Box>
          <Box
            direction='row'
            gap='medium'
            width='xlarge'>
            <TextInputLine
              disabled={false}
              value={this.state.value}
              placeholder='type here'
              onChange={(event) => {
                this.setState({value:event.target.value});
              }}/>
            <TextInputLine
              disabled={false}
              value={this.state.value}
              placeholder='type here'
              onChange={(event) => {
                this.setState({value:event.target.value});
              }}/>
            <TextInputLine
              disabled={true}
              value={this.state.value}
              placeholder='type here'
              onChange={(event) => {
                this.setState({value:event.target.value});
              }}/>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const ChooseGroup = (props) => {
  const [selected, setSelected] = useState(false);

  return(
    <Box
      direction='row'
      gap='medium'
      width='large'>
      <Choose
        default={selected}
        onClick={(checked) => {setSelected(selected)}}/>
      <Choose
        default={!selected}
        onClick={(checked) => {setSelected(!selected)}}/>
    </Box>
  );
}


export default App;
