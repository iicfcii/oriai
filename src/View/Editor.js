import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Box, Text } from 'grommet';
import { Logo, Footer, Icon, Slider, Button, Toggle } from './Style';
import { OrigamiView } from './Editor/OrigamiView';
import { InfoView } from './Editor/InfoView';
import { ViewView } from './Editor/ViewView';
import { LayerView } from './Editor/LayerView';
import { SpaceView } from './Editor/SpaceView';
import { StepView } from './Editor/StepView';
import { Design } from '../Model/Design';
import Cat from '../Examples/Cat.json';

export const Editor = (props) => {
  const design = new Design();
  design.load(Cat);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const dimension = {width: containerWidth, height: containerHeight};
  const layout = {
    ratio: dimension.width/2,
    x: dimension.width/2,
    y: dimension.height/2,
    angle: 0,
    isometric: true,
  }

  const updateDimension = () => {
    let w = parseInt(window.getComputedStyle(containerRef.current).width,10);
    let h = parseInt(window.getComputedStyle(containerRef.current).height,10);
    setContainerWidth(w);
    setContainerHeight(h);
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimension);

    return () => {window.removeEventListener('resize', updateDimension)}
  },[]);

  useLayoutEffect(() => {
    updateDimension();
  });

  return(
    <Box
      style={{minWidth:'864px', minHeight: '576px', position: 'relative'}}
      basis='full'
      background='light1'
      flex={true}
      justify='start'
      align='center'
      pad='large'
      responsive={false}>
      <div style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,}}>
        <Box
          ref={containerRef}
          responsive={false}
          fill={true}
          justify='center'
          align='center'>
          <OrigamiView
            origami = {design.getOrigami(8)}
            dimension = {dimension}
            layout = {layout}
            space = {0}
            layer = {0}
            hideUnselectedFaces = {false}
            pointSelected = {[]}
            edgeSelected = {[]}
            faceSelected = {[]}
            update = {() => {}}
          />
        </Box>
      </div>
      <Box
        flex={false}
        direction='row'
        fill='horizontal'
        justify='between'
        align='center'
        height='xsmall'>
        <InfoView/>
        <ViewView/>
      </Box>
      <Box
        direction='row'
        fill
        justify='between'
        align='stretch'>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          <LayerView/>
        </Box>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          <SpaceView/>
        </Box>
      </Box>
      <Box
        direction='row'
        flex={false}
        fill='horizontal'
        justify='between'
        align='stretch'>
        <Box
          responsive={false}
          flex={false}
          width='medium'
          margin={{right:'large'}}>
        </Box>
        <StepView/>
        <Box
          responsive={false}
          style={{zIndex: 100}}
          flex={false} 
          width='medium'
          margin={{left:'large'}}
          align='end' >
          <Button
            onClick={() => {console.log('clicked')}}
            label={'Reset'}/>
        </Box>
      </Box>
    </Box>
  );
}
