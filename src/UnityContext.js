import React, {useEffect} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityContext = () => {  

  const { unityProvider, isLoaded, unload } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data.br",
    frameworkUrl: "/build/solar-system-build.framework.js.br",
    codeUrl: "/build/solar-system-build.wasm.br",
  });

  
  useEffect(() => {
    (!window.location.pathname.includes('webgl') && isLoaded) &&
    unload()
    return () => {
          window.document.removeEventListener('keypress', unload)
          const scripts = document.getElementsByTagName('script')
          const scriptsArray = [...scripts]
          scriptsArray.map((script) => (
            script.src.includes("solar-system-build") &&
            script.remove()
        ))
      }
    }, [isLoaded, unload]);
  

    return (
      
        <Unity  unityProvider={unityProvider}/>
    
    );
  }
    
  export default UnityContext;