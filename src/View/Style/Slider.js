import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Stack } from 'grommet';

// TODO: add focus keyboard support
export const Slider = (props) => {
  const valueRef = useRef(0);
  // do not use value as state, cant update fast enough
  const boxRef = useRef(null);
  const thumbSizeMax = 36;
  const thumbSize = 32;
  const trackHeight = 6;
  const offsetX = (thumbSizeMax/2-trackHeight/2); // Actual origin x

  const [width, setWidth] = useState(0);
  const [padLeft, setPadLeft] = useState(0);
  const [selected, setSelected] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [options, setOptions] = useState({min:0,max:100,step:1});

  const step2Pad = (step) => {
    let percent = step*props.step/(props.max-props.min);
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;

    return percent*(width-thumbSizeMax);
  }

  const value2Step = (val) => {
    return Math.round((val-props.min)/props.step);
  }

  const clientX2Step = (clientX) => {
    let rect = boxRef.current.getBoundingClientRect();
    let x = clientX-rect.left;
    let step = Math.round((x-offsetX)/(width-offsetX*2)*(props.max-props.min)/props.step);
    let maxStep = Math.floor((props.max-props.min)/props.step)
    if (step < 0) step = 0;
    if (step > maxStep) step = maxStep;
    return step;
  }

  const event2ClientXY = (event) => {
    if (event.touches){
      // Touch event
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    } else {
      // Mouse event
      return {
        x: event.clientX,
        y: event.clientY,
      }
    }

  }
  const moveListener = (event) => {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    let step = clientX2Step(event2ClientXY(event).x);
    let newValue = step*props.step;

    if (newValue !== valueRef.current) {
      valueRef.current = newValue;
      props.onChange(newValue);
      setPadLeft(step2Pad(step));
    }
  }
  const releaseListener = (event) => {
    setSelected(false);
    setHover(false);
    document.removeEventListener('mousemove',moveListener);
    document.removeEventListener('mouseup',releaseListener);
    document.removeEventListener('touchmove', moveListener);
    document.removeEventListener('touchend', releaseListener);
  }

  const onPress = (event) => {
    let step = clientX2Step(event2ClientXY(event).x);
    let newValue = step*props.step;
    props.onChange(newValue);

    setSelected(true);
    valueRef.current = newValue;
    setPadLeft(step2Pad(step));

    document.addEventListener('mousemove', moveListener, {passive: false});
    document.addEventListener('mouseup', releaseListener, {passive: false});
    document.addEventListener('touchmove', moveListener, {passive: false});
    document.addEventListener('touchend', releaseListener, {passive: false});
  }

  useLayoutEffect(() => {
    // Calc width
    let w = parseInt(window.getComputedStyle(boxRef.current).width,10);
    setWidth(w);

    // Calc pad when width ready
    if (width === 0) return;
    let pad = step2Pad(value2Step(props.value));
    if (props.value > props.max) valueRef.current = props.max;
    if (props.value < props.min) valueRef.current = props.min;
    valueRef.current = props.value;
    setPadLeft(pad);
  }, [width,props.value,props.min,props.max,props.step]);

  return(
      <Stack
        fill={true}
        anchor='top-left'>
        <Box
          ref={boxRef}
          pad={offsetX+'px'}
          justify='center'
          height={thumbSizeMax+'px'}
          focusIndicator={false}>
          <Box
            direction={'row'}
            justify='start'
            background='light3'
            height={trackHeight+'px'}
            round='xlarge'
            elevation={focus?'focus':'none'}
            focusIndicator={false}>
            <Box
              background='blue'
              height={trackHeight+'px'}
              width={padLeft+'px'}
              round={true}
              focusIndicator={false}>
            </Box>
          </Box>
        </Box>
        <Box
          pad={{left: padLeft+'px'}}
          justify='center'
          focusIndicator={false}>
          <Box
            justify='center'
            align='center'
            height={thumbSizeMax+'px'}
            width={thumbSizeMax+'px'}
            focusIndicator={false}>
            <Box
              background='white'
              height={hover||selected?thumbSizeMax+'px':thumbSize+'px'}
              width={hover||selected?thumbSizeMax+'px':thumbSize+'px'}
              border={{
                color: 'blue',
                size: '6px',
                style: 'solid',
                side: 'all',
              }}
              round='xlarge'
              focusIndicator={false}>
            </Box>
          </Box>
        </Box>
        <Box
          height={thumbSizeMax+'px'}
          width={width+'px'}
          focusIndicator={false}
          onMouseDown={onPress}
          onMouseMove={(event) => {
            // No touch event needed
            if(selected) return;

            let rect = boxRef.current.getBoundingClientRect();
            let x = event.clientX-rect.left;
            let y = event.clientY-rect.top;
            let step = value2Step(valueRef.current);
            let thumbX = step2Pad(step)+thumbSizeMax/2;
            let thumbY = thumbSizeMax/2;

            let distSq = (x-thumbX)*(x-thumbX)+(y-thumbY)*(y-thumbY);
            let radSq = (thumbSize/2)*(thumbSize/2);

            setHover(distSq<=radSq);
          }}
          onTouchStart={onPress}
          onTouchCancel={(event) => {
            setSelected(false);
            setHover(false);
            document.removeEventListener('touchmove', moveListener);
            document.removeEventListener('touchend', releaseListener);
          }}
          onClick={() => {}}
          onFocus={() => {setFocus(true)}}
          onBlur={() => {setFocus(false)}}>
        </Box>
      </Stack>
  );
}
