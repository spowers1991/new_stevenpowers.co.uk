import React from 'react';
import Page from '../components/Page'
import WebGL from '../components/blocks/WebGL/index';

const WebGl = () => {  
    return (        
        <div>     
            <Page title="Solar System in WebGL" caption="Here is some simple post data that we have fetched from an external API..." blocks={<WebGL />}/>
        </div>           
    )
}

export default WebGl;