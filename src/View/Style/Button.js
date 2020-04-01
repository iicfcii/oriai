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
      flex={false}
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

export const NavCard = (props) => {
  const boxRef = useRef(null);

  // No focus or hover for now
  const [press, setPress] = useState(false);
  const [textWidth, setTextWidth] = useState('0px');

  useLayoutEffect(() => {
    // Set correct size for text
    let width = parseInt(window.getComputedStyle(boxRef.current).width,10);
    setTextWidth((width-48)+'px');
  }, [textWidth]);

  return(
    <Box
      flex={false}
      round='4px'
      width='large'
      height='large'
      elevation={press?'none':'paper'}>
      <Box
        responsive={false}
        ref={boxRef}
        background={props.color}
        fill={true}
        justify='between'
        align='center'
        pad='medium'
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
          {props.children}
          <Text
            textAlign='center'
            color='dark2'
            size='large'
            weight='bold'
            style={{width:textWidth}}
            truncate={true}>
            {props.label}
          </Text>
      </Box>
    </Box>
  );
}
