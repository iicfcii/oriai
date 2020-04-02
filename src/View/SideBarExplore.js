import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { DropMenu, DropMenuContainer } from './Style';
import { SideBar, Menu } from './SideBar';

export const SideBarExplore = (props) => {
  return(
    <SideBar>
      <Menu
        color='yellow'
        label='Explore'>
        <DropMenuContainer>
          <DropMenu label = 'Information'>
              <Text
                textAlign='start'
                color='dark2'
                size='small'>
                Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat.
              </Text>
          </DropMenu>
          <DropMenu label = 'Tools'>
            <Text
              textAlign='start'
              color='dark2'
              size='small'>
              Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat.
            </Text>
          </DropMenu>
        </DropMenuContainer>
      </Menu>
    </SideBar>
  );
}
