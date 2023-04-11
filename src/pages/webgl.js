import React from 'react';
import Page from '../components/Page'
import WebGL from '../components/blocks/WebGL/index';

const WebGl = () => {
    
    const SeoConfig = {
        title: "Webgl Solar System",
        description: "A WebGL Solar System I created using Unity and then imported into React using the react-unity-webgl package",
        image: "",
        robots: "",
    }
    
    return (        
        <div>     
            <Page title="Solar System in WebGL" caption="Here is a WebGL Solar System I created using Unity and then imported into React..." blocks={<WebGL />} seo={SeoConfig}/>
        </div>           
    )
}

export default WebGl;