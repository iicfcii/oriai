import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { DropMenu, DropMenuContainer } from '../Style';
import { SideBar, Menu } from '../SideBar';
import { InfoView } from './InfoView';
import { AddView } from './AddView';
import { EditView } from './EditView';
import { DeleteView } from './DeleteView';
import { ToolsView } from './ToolsView';

export const SideBarCreate = (props) => {
  return(
    <SideBar>
      <Menu color='green' label='Create'>
        <DropMenuContainer>
          <DropMenu label = 'Information'>
            <InfoView/>
          </DropMenu>
          <DropMenu label = 'Add Step'>
            <AddView/>
          </DropMenu>
          <DropMenu label = 'Edit Next Step'>
            <EditView/>
          </DropMenu>
          <DropMenu label = 'Delete Last Step'>
            <DeleteView/>
          </DropMenu>
          <DropMenu label = 'Tools'>
            <ToolsView/>
          </DropMenu>
        </DropMenuContainer>
      </Menu>
    </SideBar>
  );
}
