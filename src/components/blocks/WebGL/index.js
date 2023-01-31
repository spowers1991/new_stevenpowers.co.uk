import React, {useEffect} from 'react';
import UnityContext from '../../../UnityContext';

const WebGL = (props) => {  
  useEffect(() => {
    return () => {
        props.unload()
      }
    }, [props]);
  return (
    <UnityContext />
  )
}

export default WebGL;
