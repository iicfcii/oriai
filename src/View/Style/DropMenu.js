import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

export const DropMenu = (props) => {
  return(
    <AccordionPanel
      header={
        <Box
          responsive={false}
          direction='row'
          justify='between'
          align='center'
          width='large'
          pad={{
            vertical: 'smallp',
            horizontal: 'xsmall'
          }}
          focusIndicator={false}
          border={{
            color: 'light1',
            size: 'small',
            style: 'solid',
            side: 'bottom',
          }}>
          <Text
            textAlign='start'
            color='dark2'
            size='small'
            truncate={true}>
            {props.label}
          </Text>
          <Box
            flex={false}
            width='xxsmall'
            height='xxsmall'>
            {props.active?(<FormUp color='dark2'/>):(<FormDown color='dark2'/>)}
          </Box>
        </Box>
      }>
      {props.children}
    </AccordionPanel>
  );
}
