import React from 'react';
import Page from '../components/Page'
import WebGL from '../components/blocks/WebGL/index';

const WebGl = () => {  
    return (        
        <div>     
            <Page title="Solar System in WebGL" caption="Here is a WebGL Solar System I created and imported into React..." blocks={<WebGL />}/>
        </div>           
    )
}

export default WebGl;