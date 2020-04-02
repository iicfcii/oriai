import React, { useState } from 'react';
import { Box, Text, Stack, Anchor } from 'grommet';
import { Logo, Footer, Icon } from './Style';
import { FormClose } from 'grommet-icons';

export const SideBar = (props) => {
  return(
    <Box
      style={{zIndex: 100}}
      background='light1'
      elevation='paperLeft'
      flex={false}
      fill='vertical'
      basis='large'
      justify='start'
      align='stretch'>
      <Logo/>
      <Box basis='full'>
        {props.children}
      </Box>
      <Footer/>
    </Box>
  );
}

export const Menu = (props) => {
  return(
    <Box
      round='4px'
      background={props.color}
      elevation='paper'
      flex={false}
      width='large'
      justify='start'
      align='stretch'
      basis='full'
      overflow='auto'>
      <Box
        direction='row'
        flex={false}
        width='large'
        justify='between'
        align='stretch'>
        <Box flex={true}>
        </Box>
        <Text
          margin={{top:'small'}}
          textAlign='center'
          color='dark2'
          size='medium'
          weight='bold'
          truncate={true}>
          {props.label}
        </Text>
        <Box flex={true}>
          <Box
            responsive={false}
            align='end'
            pad={{right:'small',top:'small'}}>
            <Icon onClick={() => {console.log('clicked')}}>
              <FormClose color='dark2'/>
            </Icon>
          </Box>
        </Box>
        </Box>
        {props.children}
    </Box>
  );
}
