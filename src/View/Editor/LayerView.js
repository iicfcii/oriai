import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Slider } from '../Style';

export const LayerView = (props) => {
  return(
    <Box style={{zIndex: 100}} direction='column' height='xlargep' align='center' margin={{vertical:'large'}}>
      <Text color='dark2' size='small' alignSelf='center'>
        layer
      </Text>
      <Box flex={true}>
        <Slider
          vertical
          min={0}
          max={100}
          step={10}
          value={50}
          onChange={(value) => {}}/>
      </Box>
      <Text color='dark2' size='small' alignSelf='center'>
        05
      </Text>
    </Box>
  );
}
