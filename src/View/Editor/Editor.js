import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Box, Text } from 'grommet';
import { Logo, Footer, Icon, Slider, Button, Toggle } from '../Style';
import { OrigamiView } from './OrigamiView';
import { InfoView } from './InfoView';
import { ViewView } from './ViewView';
import { LayerView } from './LayerView';
import { SpaceView, space2Px } from './SpaceView';
import { StepView } from './StepView';
import { Design } from '../../Model/Design';
import Cat from '../../Examples/Cat.json';

export const Editor = (props) => {
  const design = new Design();
  design.load(Cat);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [step, setStep] = useState(design.origamis.length-1);
  const [isometric, setIsometric] = useState(true);
  const [space, setSpace] = useState(0);
  const [layer, setLayer] = useState(0);
  const [info, setInfo] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [pointSelected, setPointSelected] = useState([]);
  const [edgeSelected, setEdgeSelected] = useState([]);
  const [faceSelected, setFaceSelected] = useState([]);

  const dimension = {width: containerWidth, height: containerHeight};
  const layout = {
    ratio: dimension.width/2.5,
    x: dimension.width/2,
    y: dimension.height/2+layer*space2Px(space),
    angle: 0,
    isometric: isometric,
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
            origami = {design.origamis[step]}
            dimension = {dimension}
            layout = {layout}
            space = {space2Px(space)}
            layer = {layer}
            highlight = {highlight}
            pointSelected = {pointSelected}
            setPointSelected={setPointSelected}
            edgeSelected={edgeSelected}
            setEdgeSelected={setEdgeSelected}
            faceSelected={faceSelected}
            setFaceSelected={setFaceSelected}
            update = {() => {}}
            info={info}
            setInfo={setInfo}
          />
        </Box>
      </div>
      <Box
        flex={false}
        direction='row'
        fill='horizontal'
        justify='between'
        align='center'>
        <InfoView info={info}/>
        <ViewView
          isometric={isometric}
          setIsometric={setIsometric}
          highlight={highlight}
          setHighlight={setHighlight}/>
      </Box>
      <Box
        direction='row'
        fill
        justify='between'
        align='stretch'>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          <LayerView layer={layer} setLayer={setLayer} max={design.origamis[step].layers.length-1}/>
        </Box>
        <Box flex={false} fill='vertical' justify='center' align='center'>
          <SpaceView space={space} setSpace={setSpace}/>
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
        <StepView step={step} setStep={setStep} max={design.origamis.length-1}/>
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
