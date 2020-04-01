import React, { useState } from 'react';
import { Box } from 'grommet';
import { Logo, Footer } from './Style';

export const SideBar = (props) => {
  return(
    <Box
      basis='full'
      background='light1'
      elevation='paperLeft'
      flex={false}
      width='large'
      justify='start'
      align='stretch'>
      <Logo/>
      <Box
        basis='full'
        overflow={{vertical: 'auto', horizontal: 'hidden'}}>
        {props.children}
      </Box>
      <Footer/>
    </Box>
  );
}
