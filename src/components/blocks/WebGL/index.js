import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const WebGL = () => {  

  const { unityProvider } = useUnityContext({
    loaderUrl: "./Build/solar-system-build.loader.js",
    dataUrl: "./Build/solar-system-build.data",
    frameworkUrl: "./Build/solar-system-build.framework.js",
    codeUrl: "./Build/solar-system-build.wasm",
  });

  return (

  <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
  
  )
}

export default WebGL;
