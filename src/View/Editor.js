import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { Logo, Footer, Icon, Slider, Button } from './Style';
import { Toggle } from './Style';

export const Editor = (props) => {

  const infoView = (
    <Box
      direction='row'
      justify='end'
      align='center'>
      <Text
        color='dark2'
        size='small'
        truncate={true}>
        Info
      </Text>
    </Box>
  );

  const viewView = (
    <Box
      flex={false}
      direction='row'
      justify='end'
      align='center'>
      <Text
        color='dark2'
        size='small'
        margin={{right:'small'}}>
        Isometric
      </Text>
      <Toggle
        value={true}
        onChange={(checked) => {console.log(checked)}}/>
    </Box>
  );

  const layerView = (
    <Box direction='column' height='xlargep' align='center' margin={{vertical:'large'}}>
      <Text color='dark2' size='small' alignSelf='center'>
        layer
      </Text>
      <Box flex={true}>
        <Slider
          vertical
          min={0}
          max={100}
          step={10}
          value={50}
          onChange={(value) => {}}/>
      </Box>
      <Text color='dark2' size='small' alignSelf='center'>
        05
      </Text>
    </Box>
  );

  const spaceView = (
    <Box direction='column' height='xlargep' align='center' margin={{vertical:'large'}}>
      <Text color='dark2' size='small' alignSelf='center'>
        space
      </Text>
      <Box flex={true}>
        <Slider
          vertical
          min={0}
          max={100}
          step={10}
          value={50}
          onChange={(value) => {}}/>
      </Box>
      <Text color='dark2' size='small' alignSelf='center'>
        10
      </Text>
    </Box>
  );

  const stepView = (
    <Box direction='row' width='xlargep' align='center'>
      <Text color='dark2' size='small'>
        step
      </Text>
      <Box flex={true}>
        <Slider
          min={0}
          max={12}
          step={1}
          value={6}
          onChange={(value) => {}}/>
      </Box>
      <Text color='dark2' size='small'>
        08
      </Text>
    </Box>
  );

  return(
    <Box
      style={{minWidth:'864px', minHeight: '576px'}}
      basis='full'
      background='light1'
      flex={true}
      justify='start'
      align='center'
      pad='large'
      responsive={false}>
      <Box
        flex={false}
        direction='row'
        fill='horizontal'
        justify='between'
        align='center'
        height='xsmall'>
        {infoView}
        {viewView}
      </Box>
      <Box
        direction='row'
        fill
        justify='between'
        align='stretch'>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          {layerView}
        </Box>
        <Box
          responsive={false}
          flex={true}
          justify='center'
          align='center'
          margin='large'>
        </Box>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          {spaceView}
        </Box>
      </Box>
      <Box
        direction='row'
        flex={false}
        fill='horizontal'
        justify='between'
        align='stretch'>
        <Box flex={false} width='medium' margin={{right:'large'}}>
        </Box>
        {stepView}
        <Box flex={false} width='medium' margin={{left:'large'}} align='end' >
          <Button
            onClick={() => {console.log('clicked')}}
            label={'Reset'}/>
        </Box>
      </Box>
    </Box>
  );
}
