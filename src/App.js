import React, {useEffect, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {

  const UnityContext = createContext();


 
  
  const LoaderUrl =  window.location.pathname.includes('webgl') && "/build/solar-system-build.loader.js"
  const dataUrl =  window.location.pathname.includes('webgl') && "/build/solar-system-build.data.br"
  const frameworkUrl = window.location.pathname.includes('webgl') && "/build/solar-system-build.framework.js.br"
  const codeUrl = window.location.pathname.includes('webgl') && "/build/solar-system-build.wasm.br"
  

  const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
    loaderUrl: LoaderUrl,
    dataUrl: dataUrl,
    frameworkUrl: frameworkUrl,
    codeUrl: codeUrl,
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
    <div>
      <Router>
        <Header/>
          <UnityContext.Provider value={{Unity, unityProvider, isLoaded, loadingProgression }} >
            <main>
              <Routes>
                  <Route path="/" element={<Home />} />              
                  <Route path="pages/home" element={<Home />} />
                  <Route path="pages/webgl" element={<WebGL UnityContext={UnityContext} canvas={ <Unity id="unity-player" className="w-full h-full" unityProvider={unityProvider}/> } /> } />    
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
