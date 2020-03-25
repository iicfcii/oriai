import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';

export const Select = (props) => {
  const boxRef = useRef(null);

  // No focus or hover for now
  const [press, setPress] = useState(false);

  return(
    <Box
      round='4px'
      width='medium'
      elevation={press?'none':'paper'}>
      <Box
        ref={boxRef}
        direction='row'
        background='brand'
        fill={true}
        justify='between'
        align='center'
        pad='xsmall'
        gap='xsmall'
        round='4px'
        focusIndicator={true}
        onMouseDown={(event) => {
          event.preventDefault();
          setPress(true);
        }}
        onMouseUp={() => {setPress(false)}}
        onMouseOut={() => {setPress(false)}}
        onTouchStart={() => {setPress(true)}}
        onTouchEnd={() => {setPress(false)}}
        onClick={props.onClick}>
          <Text
            textAlign='start'
            color='dark2'
            size='small'
            truncate={true}>
            {props.label}
          </Text>
          <Box
            flex={false}
            background='red'
            width='xxsmall'
            height='xxsmall'>
          </Box>
      </Box>
    </Box>
  );
}
