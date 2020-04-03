import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Button } from '../Style';

export const ToolsView = (props) => {
  return(
    <Box
      responsive={false}
      flex={false}
      margin='small'
      gap='24px'>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Save'}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Share'}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          onClick={() => {console.log('clicked')}}
          label={'Download'}/>
      </Box>
      <Box direction='row' justify='center' align='center'>
        <Button
          color='red'
          onClick={() => {console.log('clicked')}}
          label={'Confirm'}/>
      </Box>
    </Box>
  );
}
