import React from 'react';
import Page from '../components/Page'
import WebGL from '../components/blocks/WebGL/index';

const WebGl = (props) => {  
    return (        
        <div>     
            <Page title="Solar System in WebGL" caption="Here is a WebGL Solar System I created and imported into React..." blocks={<WebGL  Unity={props.Unity} unityProvider={props.unityProvider} isLoaded={props.isLoaded} loadingProgression={props.loadingProgression} unload={props.unload} removeEventListener={props.removeEventListener}/>}/>
        </div>           
    )
}

export default WebGl;