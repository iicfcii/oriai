import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Text } from 'grommet';
import { Button } from '../Style';

export const DeleteView = (props) => {
  return(
    <Box
      responsive={false}
      flex={false}
      margin='small'
      gap='12px'>
      <Text textAlign='start' color='dark2' size='small'>
        This will delete the last step of this design. Please confirm.
      </Text>
      <Box direction='row' justify='center' align='center'>
        <Button
          color='red'
          onClick={() => {console.log('clicked')}}
          label={'Confirm'}/>
      </Box>
    </Box>
  );
}
