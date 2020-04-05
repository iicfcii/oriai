import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Box, Stack } from 'grommet';

// TODO: add focus keyboard support
export const Slider = (props) => {
  const valueRef = useRef(0);
  // do not use value as state, cant update fast enough
  const boxRef = useRef(null);
  const thumbSizeMax = 36;
  const thumbSize = 32;
  const trackHeight = 6;
  const offset = (thumbSizeMax/2-trackHeight/2); // Actual origin x
  const maxStep = Math.floor((props.max-props.min)/props.step);

  const [length, setLength] = useState(0);
  const [padStart, setPadStart] = useState(0);
  const [selected, setSelected] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [options, setOptions] = useState({min:0,max:100,step:1});

  const step2Pad = (step) => {
    // Avoid divided by 0
    if (props.max-props.min < 1e-6) return props.vertical?(length-thumbSizeMax):0

    let percent = step*props.step/(props.max-props.min);
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;

    return percent*(length-thumbSizeMax);
  }

  const value2Step = (val) => {
    return Math.round((val-props.min)/props.step);
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


  const event2Step = (event) => {
    let rect = boxRef.current.getBoundingClientRect();
    let l = props.vertical?event2ClientXY(event).y-rect.top:event2ClientXY(event).x-rect.left;
    let step = Math.round((l-offset)/(length-offset*2)*(props.max-props.min)/props.step);
    if (step < 0) step = 0;
    if (step > maxStep) step = maxStep;
    return step;
  }

  const moveListener = (event) => {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    let step = event2Step(event);
    let newValue = step*props.step;
    if (props.vertical) newValue = (maxStep-step)*props.step;

    if (newValue !== valueRef.current) {
      valueRef.current = newValue;
      props.onChange(newValue);
      setPadStart(step2Pad(step));
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
    let step = event2Step(event);
    let newValue = step*props.step;
    if (props.vertical) newValue = (maxStep-step)*props.step;

    props.onChange(newValue);

    setSelected(true);
    valueRef.current = newValue;
    setPadStart(step2Pad(step));

    document.addEventListener('mousemove', moveListener, {passive: false});
    document.addEventListener('mouseup', releaseListener, {passive: false});
    document.addEventListener('touchmove', moveListener, {passive: false});
    document.addEventListener('touchend', releaseListener, {passive: false});
  }

  const update = () => {
    // Calc length
    let w = parseInt(window.getComputedStyle(boxRef.current).width,10);
    let h = parseInt(window.getComputedStyle(boxRef.current).height,10);
    setLength(props.vertical?h:w);
    // Calc pad when length ready
    if (length === 0) return;
    let step = value2Step(props.value);
    if (props.vertical) step = maxStep-step;
    let pad = step2Pad(step);
    if (props.value > props.max) valueRef.current = props.max;
    if (props.value < props.min) valueRef.current = props.min;
    valueRef.current = props.value;
    setPadStart(pad);
  }

  useEffect(() => {
    window.addEventListener('resize', update);

    return () => {window.removeEventListener('resize', update)}
  },[]);

  useLayoutEffect(update, [length,props.value,props.min,props.max,props.step]);

  return(
      <Stack
        background='blue'
        fill={true}
        anchor='top-left'>
        <Box
          ref={boxRef}
          pad={offset+'px'}
          justify='center'
          fill={props.vertical?'vertical':'horizontal'}
          width={props.vertical?thumbSizeMax+'px':''}
          height={props.vertical?'':thumbSizeMax+'px'}
          focusIndicator={false}>
          <Box
            direction='column-reverse'
            justify='start'
            background='light3'
            fill={props.vertical?'vertical':'horizontal'}
            width={props.vertical?trackHeight+'px':''}
            height={props.vertical?'':trackHeight+'px'}
            round='xlarge'
            elevation={focus?'focus':'none'}
            focusIndicator={false}>
            <Box
              background='blue'
              height={props.vertical?length-offset*2-padStart+'px':trackHeight+'px'}
              width={props.vertical?trackHeight+'px':padStart+trackHeight+'px'}
              round={true}
              focusIndicator={false}>
            </Box>
          </Box>
        </Box>
        <Box
          pad={props.vertical?{top: padStart+'px'}:{left: padStart+'px'}}
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
          height={props.vertical?length+'px':thumbSizeMax+'px'}
          width={props.vertical?thumbSizeMax+'px':length+'px'}
          focusIndicator={false}
          onMouseDown={onPress}
          onMouseMove={(event) => {
            // No touch event needed
            if(selected) return;

            let rect = boxRef.current.getBoundingClientRect();
            let x = event.clientX-rect.left;
            let y = event.clientY-rect.top;
            let step = value2Step(valueRef.current);
            let thumbX = props.vertical?thumbSizeMax/2:step2Pad(step)+thumbSizeMax/2;
            let thumbY = props.vertical?step2Pad(step)+thumbSizeMax/2:thumbSizeMax/2;

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
