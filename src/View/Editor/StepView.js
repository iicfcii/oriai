import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Slider } from '../Style';

export const StepView = (props) => {
  return(
    <Box style={{zIndex: 100}} direction='row' width='xlargep' align='center'>
      <Text color='dark2' size='small'>
        step
      </Text>
      <Box flex={true}>
        <Slider
          min={0}
          max={12}
          step={1}
          value={6}
          onChange={(value) => {}}/>
      </Box>
      <Text color='dark2' size='small'>
        08
      </Text>
    </Box>
  );
}
