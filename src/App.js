import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {

  const UnityContext = createContext();

  const { unityProvider, isLoaded, loadingProgression, unload, removeEventListener } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data.br",
    frameworkUrl: "/build/solar-system-build.framework.js.br",
    codeUrl: "/build/solar-system-build.wasm.br",
  });

  const [unityState, setUnityState] = useState(false)

  useEffect(() => {
    return () => {
      const scripts = document.getElementsByTagName('script')
      const scriptsArray = [...scripts]
      !isLoaded &&
      removeEventListener('keypress', unload)
      scriptsArray.map((script) => (
        script.remove()
      ))
      !unityState &&
      isLoaded &&
      unload();
      console.log('is loaded!')
      removeEventListener('keypress', unload)
      scriptsArray.map((script) => (
        script.remove()
      ))
    }
  }, [isLoaded, unload, removeEventListener, unityState])

  return (
    <div>
      <Router>
        <Header UnityContext={UnityContext} />
        <UnityContext.Provider value={{ Unity, useUnityContext, unityProvider, isLoaded, loadingProgression, unload, removeEventListener, unityState, setUnityState}}>
          <main>
            <Routes>
                <Route path="/" element={<Home />} />              
                <Route path="pages/home" element={<Home />} />
                <Route path="pages/webgl" element={<WebGL UnityContext={UnityContext} canvas={<Unity unityProvider={unityProvider}/>} />} />    
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
