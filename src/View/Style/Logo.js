import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text, Anchor } from 'grommet';

export const Logo = (props) => {
  return(
    <Box
      flex={false}
      width='large'
      height='small'
      justify='center'
      align='center'>
        <Anchor
          color='blue'
          size='xlarge'>
          ORIAI
        </Anchor>
    </Box>
  );
}
