import React, { Component, useState } from "react";
import { SideBarMain } from './View/SideBarMain';
import { SideBarExplore } from './View/SideBarExplore';
import { SideBarCreate } from './View/SideBarCreate/SideBarCreate';
import { Editor } from './View/Editor';
import { Box, Grommet } from 'grommet';
import { Theme } from './View/Style';
 // import './index.css';


const App = (props) => {
  return(
    <Grommet theme={Theme} full>
      <Box fill direction='row'>
        <SideBarCreate/>
        <Editor/>
      </Box>
    </Grommet>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       text: '',
//       checked: false,
//       value: 10,
//       select: 'Select',
//     }
//   }
//
//   render() {
//     return (
//       <Grommet theme={Theme} full>
//         <Box fill={true} gap='medium'>
//           <Box
//             flex={false}
//             direction='row'
//             gap='medium'
//             align='center'>
//             <Logo />
//             <Button
//               onClick={() => {console.log('clicked')}}
//               label={'Save too long'}/>
//             <NavCard
//               onClick={() => {console.log('clicked')}}
//               label={'Explore'}
//               color={'yellow'}>
//               <Folder color='dark2' size='144px'/>
//             </NavCard>
//             <NavCard
//               onClick={() => {console.log('clicked')}}
//               label={'Create'}
//               color={'green'}>
//               <Edit color='dark2' size='144px'/>
//             </NavCard>
//             <NavCard
//               onClick={() => {console.log('clicked')}}
//               label={'About'}
//               color={'blue'}>
//               <Info color='dark2' size='144px'/>
//             </NavCard>
//           </Box>
//           <Box
//             flex={false}
//             direction='row'
//             gap='medium'
//             width='large'
//             align='center'>
//             <Toggle
//               value={this.state.checked}
//               onChange={(checked) => {
//                 this.setState({checked: checked});
//               }}/>
//             <Choose
//               value={!this.state.checked}
//               onClick={(checked) => {
//                 this.setState({checked: !checked});
//               }}/>
//           </Box>
//           <Box
//             flex={false}
//             direction='row'
//             gap='medium'
//             width='xlarge'>
//             <TextInputLine
//               disabled={false}
//               value={this.state.text}
//               placeholder='type here'
//               onChange={(event) => {
//                 this.setState({text:event.target.value});
//               }}/>
//             <TextInputLine
//               disabled={false}
//               value={this.state.text}
//               placeholder='type here'
//               onChange={(event) => {
//                 this.setState({text:event.target.value});
//               }}/>
//             <TextInputLine
//               disabled={true}
//               value={this.state.text}
//               placeholder=''
//               onChange={(event) => {
//                 this.setState({text:event.target.value});
//               }}/>
//           </Box>
//           <Box
//             flex={false}
//             direction='row'
//             gap='medium'
//             width='xlarge'>
//             <Slider
//               min={0}
//               max={100}
//               step={10}
//               value={this.state.value}
//               onChange={(value) => {
//                 this.setState({value:value});
//               }}/>
//             <Slider
//               min={0}
//               max={100}
//               step={10}
//               value={100-this.state.value}
//               onChange={(value) => {
//                 this.setState({value:100-value});
//               }}/>
//           </Box>
//           <Box
//             flex={false}
//             direction='row'
//             gap='medium'>
//             <Select
//               label={this.state.select}
//               options={['Select','Line', 'Bisector', 'Endpoint']}
//               onClick={(label)=>{this.setState({select:label});}}/>
//             <Select
//               label={this.state.select}
//               options={['Select','Line', 'Bisector', 'Endpoint']}
//               onClick={(label)=>{this.setState({select:label});}}/>
//           </Box>
//           <Box
//             flex={false}
//             background='green'
//             width='large'
//             height='large'
//             overflow='auto'
//             pa={{vertical: 'medium'}}>
//             <DropMenuContainer>
//               <DropMenu label = 'Information'>
//                   <Text
//                     textAlign='start'
//                     color='dark2'
//                     size='small'>
//                     Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat.
//                   </Text>
//               </DropMenu>
//               <DropMenu label = 'Tools'>
//                 <Text
//                   textAlign='start'
//                   color='dark2'
//                   size='small'>
//                   Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat.
//                 </Text>
//               </DropMenu>
//             </DropMenuContainer>
//           </Box>
//         </Box>
//       </Grommet>
//     );
//   }
// }

export default App;
