import React from 'react';
import Page from '../components/Page'
import UnityContext from '../components/blocks/WebGL/UnityContext';

const WebGl = (props) => {  
    return (        
        <div>     
            <Page title="Solar System in WebGL" caption="Here is a WebGL Solar System I created and imported into React..." blocks={<UnityContext UnityContext={props.UnityContext} canvas={props.canvas}/>}/>
        </div>           
    )
}

export default WebGl;