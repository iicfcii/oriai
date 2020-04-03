import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Toggle } from '../Style';

export const ViewView = (props) => {
  return(
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
        value={true}
        onChange={(checked) => {console.log(checked)}}/>
    </Box>
  );
}
