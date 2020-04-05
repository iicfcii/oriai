import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Slider } from '../Style';

export const LayerView = (props) => {
  return(
    <Box
      responsive={false}
      style={{zIndex: 100}}
      direction='column'
      height='xlargep'
      align='center'
      margin={{vertical:'large'}}>
      <Text color='dark2' size='small' alignSelf='center'>
        layer
      </Text>
      <Box flex={true}>
        <Slider
          vertical
          min={0}
          max={props.max}
          step={1}
          value={props.layer}
          onChange={(value) => {props.setLayer(value)}}/>
      </Box>
      <Text color='dark2' size='small' alignSelf='center'>
        {props.layer+''}
      </Text>
    </Box>
  );
}
