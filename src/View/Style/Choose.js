import React, { useState, useLayoutEffect } from 'react';
import { Box } from 'grommet';

export const Choose = (props) => {
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    setChecked(props.value);
  }, [props.value]);

  return(
    <Box
      background='light3'
      justify='center'
      align='center'
      round='xlarge'
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
        round='xlarge'
        focusIndicator={false}>
      </Box>
    </Box>
  )
}
