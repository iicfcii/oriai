import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Box, Drop, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

export const Select = (props) => {
  const boxRef = useRef();

  const [press, setPress] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [index, setIndex] = useState(props.label?-1:0);

  useEffect(() => {
    if (props.label) setIndex(-1); // If label prop changes, use it.
    setShowDrop(false);
  }, [props.label]);

  const renderOptions = () => {
    let options = [];
    props.options.forEach((item, i) => {
      let round = false;
      if (i === 0) round = 'top';
      if (i === props.options.length-1) round = 'bottom';

      options.push(
        <Option
          key={''+i}
          round={round}
          label={item}
          onClick={() => {
            setShowDrop(false);
            setIndex(i);
            props.onClick(item);
          }}/>
      );
    });

    return options;
  }

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
        onClick={() => {setShowDrop(!showDrop);}}>
          <Text
            textAlign='start'
            color='dark2'
            size='small'
            truncate={true}>
            {index < 0?props.label:props.options[index]}
          </Text>
          <Box
            flex={false}
            width='xxsmall'
            height='xxsmall'>
            {showDrop?(<FormUp color='dark2'/>):(<FormDown color='dark2'/>)}
          </Box>
      </Box>
      {boxRef.current && showDrop && (
        <Drop
          plain={true}
          overflow='visible'
          elevation='none'
          align={{top: "bottom", left: "left"}}
          target={boxRef.current}>
          <Box
            overflow='visible'
            background='transparent'
            pad={{top:'6px'}}>
            <Box
              overflow={{vertical: 'auto', horizontal: 'hidden'}}
              elevation='paper'
              round='4px'
              width='medium'
              height='medium'>
              {renderOptions()}
            </Box>
          </Box>
        </Drop>
      )}
    </Box>
  );
}

export const Option = (props) => {
  const boxRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [textWidth, setTextWidth] = useState('0px');

  useLayoutEffect(() => {
    // Set correct size for text
    let width = parseInt(window.getComputedStyle(boxRef.current).width,10);
    setTextWidth((width-12)+'px');
  }, [textWidth]);

  const getRound = () => {
    if(props.round === 'top'){
      return {size: '4px', corner: 'top'}
    } else if(props.round === 'bottom') {
      return {size: '4px', corner: 'bottom'}
    } else {
      return 'none'
    }
  }

  return(
    <Box
      ref={boxRef}
      round={getRound()}
      flex={false}
      pad='xsmall'
      direction='row'
      background='blue'
      height='xsmall'
      width='medium'
      onMouseDown={(event) => {event.preventDefault();}}
      onMouseMove={() => {setHover(true)}}
      onMouseOut={() => {setHover(false)}}
      onClick={() => {props.onClick(props.label)}}>
      <Text
        style={{width:textWidth}}
        textAlign='start'
        color={hover?'white':'dark2'}
        size='small'
        truncate={true}>
        {props.label}
      </Text>
    </Box>
  );
}
