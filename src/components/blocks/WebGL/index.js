import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Unity, useUnityContext } from "react-unity-webgl";


const WebGL = () => {  

  const [fullscreen, setFullScreen] = useState(false)
  function fullScreenToggle() {
    setFullScreen(true)
    fullscreen !== false &&
    setFullScreen(false)
  }

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data.br",
    frameworkUrl: "/build/solar-system-build.framework.js.br",
    codeUrl: "/build/solar-system-build.wasm.br",
  });
    
  const location = useLocation();
  const [state, setState] = useState(false)

  useEffect(() => {
      setState(true)
  }, [location]);

  const [loadingPercentage, SetLoadingPercentage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      loadingPercentage < 99 &&
      SetLoadingPercentage(loadingPercentage+1)
  }, 150);

    return () => clearInterval(interval);
  }, [loadingProgression, loadingPercentage]);

  return (
  <div className={`${fullscreen ? 'fixed w-full h-full z-30 top-0 left-0' : 'relative max-w-5xl mt-10 mx-auto'}  ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300 px-10`}>
      <div className={`${fullscreen && 'hidden'} mb-10 text-sm`}>
        <h3>
          <b>
              Camera Controls:
          </b>
        </h3>
        <p>
          New Target: 0-8 (Planets in order from the Sun. The Sun mapped to 0.) <br/>
          Panning & Zooming: W,A,S,D <br/>
          Pitch & Yaw: Q, E  <br/>
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
