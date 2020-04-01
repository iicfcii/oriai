import React, { useState } from 'react';
import { Box } from 'grommet';
import { NavCard } from './Style';
import { SideBar} from './SideBar';
import { Folder, Edit, Info } from 'grommet-icons';

export const SidebarMain = (props) => {
  const offset = 96; // px

  const [select, setSelect] = useState('explore');

  const renderButtons = () => {
    const exploreButton = (
      <div
        style={{
          position: 'absolute',
          top: '0px',
          maxWidth: '100%',
        }}>
        <NavCard
          onClick={() => {setSelect('explore')}}
          label={'Explore'}
          color={'yellow'}>
          <Folder color='dark2' size='168px'/>
        </NavCard>
      </div>
    );
    const createButton = (
      <div
        style={{
          position: 'absolute',
          top: offset+'px',
          maxWidth: '100%',
        }}>
        <NavCard
          onClick={() => {setSelect('create')}}
          label={'Create'}
          color={'green'}>
          <Edit color='dark2' size='168px'/>
        </NavCard>
      </div>
    );
    const aboutButton = (
      <div
        style={{
          position: 'absolute',
          top: offset*2+'px',
          maxWidth: '100%',
        }}>
        <NavCard
          onClick={() => {setSelect('about')}}
          label={'About'}
          color={'blue'}>
          <Info color='dark2' size='168px'/>
        </NavCard>
      </div>
    );

    if (select === 'explore'){
      return(
        <div style={{position: 'relative'}}>
          {aboutButton}
          {createButton}
          {exploreButton}
        </div>
      );
    } else if (select === 'create'){
      return(
        <div style={{position: 'relative'}}>
          {exploreButton}
          {aboutButton}
          {createButton}
        </div>
      );
    } else if (select === 'about'){
      return(
        <div style={{position: 'relative'}}>
          {exploreButton}
          {createButton}
          {aboutButton}
        </div>
      );
    } else {
      return null;
    }
  }

  return(
    <SideBar>
      {renderButtons()}
    </SideBar>
  );
}
