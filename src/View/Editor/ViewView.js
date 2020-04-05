import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Toggle } from '../Style';

export const ViewView = (props) => {
  return(
    <Box
      responsive={false}
      gap='12px'>
      <Box
        style={{zIndex: 100}}
        flex={false}
        direction='row'
        justify='end'
        align='center'>
        <Text
          color='dark2'
          size='small'
          margin={{right:'small'}}>
          Isometric
        </Text>
        <Toggle
          value={props.isometric}
          onChange={(checked) => {props.setIsometric(checked)}}/>
      </Box>
      <Box
        style={{zIndex: 100}}
        flex={false}
        direction='row'
        justify='end'
        align='center'>
        <Text
          color='dark2'
          size='small'
          margin={{right:'small'}}>
          Highlight Faces
        </Text>
        <Toggle
          value={props.highlight}
          onChange={(checked) => {props.setHighlight(checked)}}/>
      </Box>
    </Box>
  );
}
