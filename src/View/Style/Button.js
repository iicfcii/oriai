import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';

export const Button = (props) => {
  const boxRef = useRef(null);

  // No focus or hover for now
  const [press, setPress] = useState(false);
  const [textWidth, setTextWidth] = useState('0px');

  useLayoutEffect(() => {
    // Set correct size for text
    let height = parseInt(window.getComputedStyle(boxRef.current).height,10);
    let width = parseInt(window.getComputedStyle(boxRef.current).width,10);
    setTextWidth((width-height)+'px');
  }, [textWidth]);

  return(
    <Box
      round='xlarge'
      width='medium'
      elevation={press?'none':'paper'}>
      <Box
        ref={boxRef}
        background='brand'
        fill={true}
        justify='center'
        align='center'
        pad='xsmall'
        round='xlarge'
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
            textAlign='center'
            color='dark2'
            size='small'
            style={{width:textWidth}}
            truncate={true}>
            {props.label}
          </Text>
      </Box>
    </Box>
  );
}

const noSelect = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none'
}
