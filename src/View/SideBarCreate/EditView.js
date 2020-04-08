import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { TextInputLine, Choose, Button, Select } from '../Style';
import { StepView } from './StepView';

export const EditView = (props) => {
  return(
    <Box>
      <Box
        responsive={false}
        flex={false}
        margin='small'
        gap='12px'>
        <Box direction='row' justify='start' align='center'>
          <Text textAlign='start' color='dark2' size='small' weight='bold'>
            Next Step
          </Text>
        </Box>
        <Box
          responsive={false}
          direction='row'
          justify='between'
          align='center'
          margin={{left: 'small'}}>
          <Text textAlign='start' color='dark2' size='small'>
            Crease face 1 along line from (0.50, 1.00) to (0.50, 1.00)
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
