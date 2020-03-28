import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Accordion, } from 'grommet';

export const DropMenuContainer = (props) => {
  const [activeIndex, setActiveIndex] = useState([]);

  return(
    <Accordion
      activeIndex = {activeIndex}
      onActive={(index) => {setActiveIndex(index);}}
      multiple={true}>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child,{
          active: activeIndex.indexOf(index) != -1,
        });
      })}
    </Accordion>
  );
}
