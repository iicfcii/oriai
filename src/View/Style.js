import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Box, Text, CheckBox, TextInput, RadioButton } from 'grommet';
import { FormClose, Edit } from 'grommet-icons';

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
      round={true}
      width='medium'
      elevation={press?'none':'paper'}>
      <Box
        ref={boxRef}
        background='brand'
        fill={true}
        justify='center'
        align='center'
        pad='xsmall'
        round={true}
        focusIndicator={true}
        onMouseDown={() => {setPress(true)}}
        onMouseUp={() => {setPress(false)}}
        onMouseOut={() => {setPress(false)}}
        onTouchStart={() => {setPress(true)}}
        onTouchEnd={() => {setPress(false)}}
        onClick={props.onClick}>
          <Text
            textAlign='center'
            color='dark2'
            size='small'
            style={{...noSelect,width:textWidth}}
            truncate={true}>
            {props.label}
          </Text>
      </Box>
    </Box>
  );
}

// Controllable with props from parents
// Not controllable by own state, will be fixed soon.
// https://github.com/grommet/grommet/issues/3855
export const Toggle = (props) => {
  return(
    <CheckBox
      checked={props.defaultValue}
      toggle={true}
      onChange={(event) => {
        props.onChange(event.target.checked);
      }}/>
  );
}

export const Choose = (props) => {
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    // console.log('Effect default', props.defaultValue);
    setChecked(props.defaultValue);
  }, [props.defaultValue]);

  return(
    <Box
      background='light3'
      justify='center'
      align='center'
      round={true}
      width='xxsmall'
      height='xxsmall'
      onClick={() => {
        props.onClick(!checked);
        setChecked(!checked);
      }}
      focusIndicator={true}>
      <Box
        width='12px'
        height='12px'
        background={checked?'blue':'white'}
        round={true}
        focusIndicator={false}>
      </Box>
    </Box>
  )
}

export const TextInputLine = (props) => {
  return(
    <Box
      border={{
        color: props.disabled?'dark2':'light2',
        size: 'small',
        style: 'solid',
        side: 'all'
      }}
      focusIndicator={false}>
      <TextInput
        size='small'
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}/>
    </Box>
  );
}

const noSelect = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none'
}

export const Theme = {
  global: {
    colors: {
      brand: '#7fd4ff',
      blue: '#7fd4ff',
      red: '#ff6b6b',
      yellow: '#ffe66d',
      white: '#ffffff',
      light1: '#f5f5f5',
      light2: '#e8e8e8',
      light3: '#dcdcdc',
      black: '#000000',
      dark1: '#404040',
      dark2 :'#606060',
      dark3: '#808080',
      placeholder: '#f5f5f5'
    },
    focus: {
      border: {
        color: 'rgba(0, 0, 0, 0.1)', // Will change box shadow, conflict with elevation
      },
    },
    elevation: {
      light: {
        paper: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      dark: {
        paper: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
    font: {
      family: 'Josefin Sans',
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '36px',
      xlarge: '72px',
      responsiveBreakpoint: 'small'
    },
    size: {
      xxsmall: '24px',
      xsmall: '36px',
      small: '72px',
      medium: '144px',
      large: '288px',
      xlarge: '576px',
      xxlarge: '1152px',
      full: '100%',
      origami: '192',
    },
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: '4px',
      large: '12px',
      xlarge: '24px'
    },
  },
  text: {
    xsmall: {
      'size': '14px',
      'height': '14px',
      'maxWidth': '336px'
    },
    small: {
      'size': '24px',
      'height': '24px',
      'maxWidth': '576px'
    },
    medium: {
      'size': '36px',
      'height': '36px',
      'maxWidth': '864px'
    },
    large: {
      'size': '48px',
      'height': '48px',
      'maxWidth': '1152px'
    },
    xlarge: {
      'size': '60px',
      'height': '60px',
      'maxWidth': '1440px'
    },
    xxlarge: {
      'size': '72px',
      'height': '72px',
      'maxWidth': '1728px'
    }
  },
  checkBox: {
    color: {
      light: 'blue'
    },
    size: '36px',
    toggle: {
      color: {
        light: 'white'
      },
      background: 'light3',
      size: '66px',
      radius: '36px',
      knob: {
        extend: 'border: 3px solid #dcdcdc'
      },
    },
    border: {
      width: '0px',
      color: 'light3',
    },
    hover: {
      border: {
        color: 'undefined',
      },
    }
  },
  textInput: {
    extend: 'padding: 4px 12px; color: #606060;' +
            'opacity: 1; font-weight: normal;' +
            'border: 0px;',
  },
};
