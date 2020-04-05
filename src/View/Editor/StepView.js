import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Slider } from '../Style';

export const StepView = (props) => {
  return(
    <Box
      responsive={false}
      style={{zIndex: 100}}
      direction='row'
      width='xlargep'
      justify='center'
      align='center'>
      <Box width='48px' align='end'>
      <Text color='dark2' size='small'>
        step
      </Text>
      </Box>
      <Box flex={true}>
        <Slider
          min={0}
          max={props.max}
          step={1}
          value={props.step}
          onChange={(value) => {props.setStep(value)}}/>
      </Box>
      <Box width='48px' align='start'>
      <Text color='dark2' size='small'>
        {props.step+''}
      </Text>
      </Box>
    </Box>
  );
}
