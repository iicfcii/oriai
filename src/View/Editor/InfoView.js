import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';

export const InfoView = (props) => {
  return(
    <Box
      style={{zIndex: 100}}
      direction='row'
      justify='end'
      align='center'>
      <Text
        color='dark2'
        size='small'
        truncate={true}>
        {props.info}
      </Text>
    </Box>
  );
}
