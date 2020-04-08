import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { TextInputLine, Choose, Button, Select, Icon } from '../Style';
import { Add, Checkmark } from 'grommet-icons';

export const StepView = (props) => {
  return(
    <Box
      responsive={false}
      flex={false}
      margin='small'
      gap='12px'>
      <Box direction='row' justify='between' align='center'>
        <Text textAlign='start' color='dark2' size='small' weight='bold'>
          Faces
        </Text>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Select'}/>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          {'Selected faces 1, 2'}
        </Text>
      </Box>
      <Box direction='row' justify='start' align='center'>
        <Text textAlign='start' color='dark2' size='small' weight='bold'>
          Directions
        </Text>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Face 1
        </Text>
        <Box width='small'>
          <TextInputLine
            disabled={false}
            value=''
            placeholder='1'
            onChange={(event) => {}}/>
        </Box>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Face 2
        </Text>
        <Box width='small'>
          <TextInputLine
            disabled={false}
            value=''
            placeholder='-1'
            onChange={(event) => {}}/>
        </Box>
      </Box>
      <Box direction='row' justify='between' align='center'>
        <Text textAlign='start' color='dark2' size='small' weight='bold'>
          Line
        </Text>
        <Select
          label={'Line'}
          options={['Line', 'Bisector', 'Endpoint']}
          onClick={(label)=>{}}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Add'}/>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Point 1
        </Text>
        <Box width='medium'>
          <TextInputLine
            disabled={false}
            value=''
            placeholder='0.00, 0.00'
            onChange={(event) => {}}/>
        </Box>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Type
        </Text>
        <Select
          label={'Point'}
          options={['Point', 'Fraction', 'Input']}
          onClick={(label)=>{}}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Add'}/>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Point 2
        </Text>
        <Box width='medium'>
          <TextInputLine
            disabled={false}
            value=''
            placeholder='0.00, 0.00'
            onChange={(event) => {}}/>
        </Box>
      </Box>
      <Box
        responsive={false}
        direction='row'
        justify='between'
        align='center'
        margin={{left: 'small'}}>
        <Text textAlign='start' color='dark2' size='small'>
          Type
        </Text>
        <Select
          label={'Point'}
          options={['Point', 'Fraction', 'Input']}
          onClick={(label)=>{}}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Add'}/>
      </Box>
      <Box
        responsive={false}
        margin={{top:'small'}}
        direction='row'
        justify='center'
        align='center'>
        <Button
          color='yellow'
          onClick={() => {console.log('clicked')}}
          label={'Finish'}/>
      </Box>
    </Box>
  );
}
