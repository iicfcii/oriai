import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
  Box,
  Text,
  CheckBox,
  Stack,
  TextInput,
  RangeInput
} from 'grommet';
export { Slider } from './Style/Slider';
export { Choose } from './Style/Choose';
export { Button } from './Style/Button';
export { Select } from './Style/Select';
export { DropMenu } from './Style/DropMenu';
export { DropMenuContainer } from './Style/DropMenuContainer';

export const Toggle = (props) => {
  return(
    <CheckBox
      checked={props.value}
      toggle={true}
      onChange={(event) => {
        props.onChange(event.target.checked);
      }}/>
  );
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
      round='4px'
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

export const Theme = {
  global: {
    colors: {
      brand: '#7fd4ff',
      blue: '#7fd4ff',
      red: '#ff6b6b',
      yellow: '#ffe66d',
      purple: '#ecb0e1',
      green: '#abe188',
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
        focus: '0px 0px 2px 2px rgba(0, 0, 0, 0.1)',
      },
      dark: {
        paper: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        focus: '0px 0px 2px 2px rgba(0, 0, 0, 0.1)',
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
      smallp: '18px',
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
  rangeInput: {
    track: {
      color: 'light3',
      height: '6px',
      extend: 'border-radius: 3px;'
    },
    thumb: {
      color: 'blue',
      extend: 'height: 32px; width: 32px; margin-top: -13px;',
    },
    extend: 'height: 36px; margin: 0px;'
  },
  accordion: {
    border: undefined
  }
};
