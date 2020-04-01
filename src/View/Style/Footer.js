import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text, Anchor } from 'grommet';
import { Github, Youtube, Twitter} from 'grommet-icons';

export const Footer = (props) => {
  return(
    <Box
      flex={false}
      width='large'
      height='small'
      justify='center'
      align='center'>
      <Box
        flex={false}
        direction='row'
        height='xsmall'
        gap='large'
        justify='center'
        align='center'>
        <Anchor><Youtube color='dark2'/></Anchor>
        <Anchor><Twitter color='dark2'/></Anchor>
        <Anchor><Github color='dark2'/></Anchor>
      </Box>
      <Text
        textAlign='center'
        color='dark2'
        size='xsmall'
        weight='normal'>
        ORIAI 1.0.0
      </Text>
    </Box>
  );
}
