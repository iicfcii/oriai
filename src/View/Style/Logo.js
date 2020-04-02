import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';

export const Logo = (props) => {
  return(
    <Box
      flex={false}
      width='large'
      height='small'
      justify='center'
      align='center'>
        <Box
          flex={false}
          onClick={() => {}}>
          <Text
            color='blue'
            size='xlarge'
            weight='bold'>
            ORIAI
          </Text>
        </Box>
    </Box>
  );
}
