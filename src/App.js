import React, {useEffect, createContext, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {

  const UnityContext = createContext();

  
  const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data.br",
    frameworkUrl: "/build/solar-system-build.framework.js.br",
    codeUrl: "/build/solar-system-build.wasm.br",
  });

  const iframeRef = useRef();
  const unityFrameRef = useRef();
  var firstLog = false;


    useEffect(() => {
      console.log("use effect content:");
      return () => {
        if (iframeRef !== null) {
          if (firstLog) {
            console.log("CleanUp function called");
            unload()
            window.document
              .getElementById("iframeContainer")
              .removeChild(iframeRef.current);
          }
  
          firstLog = true;
          if (firstLog) {
            console.log("first log activated");
          }
        }
      };
    }, []);

  return (
    <div>
      <Router>
        <Header/>
          <UnityContext.Provider value={{Unity, unityProvider, isLoaded, loadingProgression }} >
            <main>
              <Routes>
                  <Route path="/" element={<Home />} />              
                  <Route path="pages/home" element={<Home />} />
                  <Route path="pages/webgl" element={<WebGL UnityContext={UnityContext} canvas={ <div id="iframeContainer" ref={iframeRef}><Unity className="w-full h-full" unityProvider={unityProvider} ref={unityFrameRef}/> </div>} /> } />    
                  <Route path="pages/contact" element={<Contact />}  />      
              </Routes>
            </main>
          </UnityContext.Provider>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
