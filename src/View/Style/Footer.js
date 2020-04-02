import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text, Anchor } from 'grommet';
import { Github, Youtube, Twitter} from 'grommet-icons';
import { Icon } from '../Style';

export const Footer = (props) => {
  return(
    <Box
      flex={false}
      width='large'
      height='small'
      justify='evenly'
      align='center'>
      <Box
        flex={false}
        direction='row'
        height='xxsmall'
        gap='large'
        justify='center'
        align='center'>
        <Icon
          onClick={() => {}}>
          <Youtube color='dark2'/>
        </Icon>
        <Icon
          onClick={() => {}}>
          <Twitter color='dark2'/>
        </Icon>
        <Icon
          onClick={() => {}}>
          <Github color='dark2'/>
        </Icon>
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
