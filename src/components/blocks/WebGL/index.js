import React, { useState } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const WebGL = () => {  

  const [fullscreen, setFullScreen] = useState(false)
  function fullScreenToggle() {
    setFullScreen(true)
    fullscreen !== false &&
    setFullScreen(false)
    console.log(fullscreen)
  }

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data",
    frameworkUrl: "/build/solar-system-build.framework.js",
    codeUrl: "/build/solar-system-build.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
  <div className={`relative max-w-5xl px-10 mt-10 overflow-hidden mx-auto `}>
      <div className={`${fullscreen && 'hidden'} mb-10 text-sm`}>
        <h3>
          <b>
              Camera Controls:
          </b>
        </h3>
        <p>
          New Target: 0-8 (Planets in order from the Sun. The Sun mapped to 0.) <br/>
          Panning: w,a,s,d <br/>
          Pitching: q, e  <br/>
        </p>
      </div>
      <div className={`${fullscreen ? 'fixed w-full h-full z-30 top-0 left-0' : 'relative max-w-5xl mt-10'} overflow-hidden duration-300 transform`}>
        <div className={`${isLoaded ? 'opacity-0' : 'opacity-100'} fixed w-full h-full  bg-black text-white text-left pointer-events-none duration-[1s] delay-[3s] flex item-center`}>          
            <span className="m-auto">Loading... ({loadingPercentage}%) </span>       
        </div>
        <div className={`${fullscreen ? 'block' : 'hidden'} fixed top-20 right-20 z-50 text-white text-7xl cursor-pointer close-icon`} onClick={() => setFullScreen(false)} >
          X
        </div>
        <Unity className="w-full h-full" unityProvider={unityProvider} />
      </div>
      <div className={`rounded text-xs relative inline-block lg:mt-0 text-l text-black py-3 mt-5 text-center group cursor-pointer`}  onClick={() => fullScreenToggle()}>
            Fullscreen
            <div className={`bg-black absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>
      </div>               
  </div>
  
  )
}

export default WebGL;
