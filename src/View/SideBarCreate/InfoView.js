import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { TextInputLine } from '../Style';

export const InfoView = (props) => {
  return(
    <Box
      responsive={false}
      flex={false}
      margin='small'
      gap='12px'>
      <Text textAlign='start' color='dark2' size='small' weight='bold'>
        Name
      </Text>
      <TextInputLine
        disabled={false}
        value=''
        placeholder='Design name'
        onChange={(event) => {}}/>
      <Text textAlign='start' color='dark2' size='small' weight='bold'>
        Creator
      </Text>
      <TextInputLine
        disabled={false}
        value=''
        placeholder='Your name'
        onChange={(event) => {}}/>
      <Text textAlign='start' color='dark2' size='small' weight='bold'>
        Email
      </Text>
      <TextInputLine
        disabled={false}
        value=''
        placeholder='name@example.com'
        onChange={(event) => {}}/>
      <Text textAlign='start' color='dark2' size='small' weight='bold'>
        Designer
      </Text>
      <TextInputLine
        disabled={false}
        value=''
        placeholder='Original designer'
        onChange={(event) => {}}/>
    </Box>
  );
}
