import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Slider } from '../Style';

export const SpaceView = (props) => {
  return(
    <Box
      responsive={false}
      style={{zIndex: 100}}
      direction='column'
      height='xlargep'
      align='center'
      margin={{vertical:'large'}}>
      <Text color='dark2' size='small' alignSelf='center'>
        space
      </Text>
      <Box flex={true}>
        <Slider
          vertical
          min={0}
          max={6}
          step={1}
          value={props.space}
          onChange={(value) => {props.setSpace(value)}}/>
      </Box>
      <Text color='dark2' size='small' alignSelf='center'>
        {space2Px(props.space)+''}
      </Text>
    </Box>
  );
}

export const space2Px = (space) => {
  if (space === 0) return 0;

  return Math.pow(3, space);
}
