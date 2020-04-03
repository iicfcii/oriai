import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { TextInputLine, Choose, Button, Select } from '../Style';
import { StepView } from './StepView';

export const AddView = (props) => {
  return(
    <Box>
      <Box
        responsive={false}
        flex={false}
        margin='small'
        gap='12px'>
        <Box direction='row' justify='between'>
          <Box direction='row'>
            <Choose
              value={false}
              onClick={(checked) => {}}/>
            <Text textAlign='start' color='dark2' size='small' weight='bold'
              margin={{left: 'small'}}>
              Crease
            </Text>
          </Box>
          <Box direction='row'>
            <Choose
              value={true}
              onClick={(checked) => {}}/>
            <Text textAlign='start' color='dark2' size='small' weight='bold'
              margin={{left: 'small'}}>
              Fold
            </Text>
          </Box>
        </Box>
      </Box>
      <StepView fold={true} edit={false}/>
    </Box>
  );
}
