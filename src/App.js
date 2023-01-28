import React, { useState, createContext } from 'react';
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

  function cleanUnity(state){
    isLoaded && 
    state &&
    unload();
    console.log('clean up test')
  }

  return (
    <div>
      <Router>
        <Header/>
        <UnityContext.Provider value={{ Unity, useUnityContext, unityProvider, isLoaded, loadingProgression, unload, removeEventListener, unityState, setUnityState, cleanUnity}}>
          <main>
            <Routes>
                <Route path="/" element={<Home />} />              
                <Route path="pages/home" element={<Home />} />
                <Route path="pages/webgl" element={<WebGL UnityContext={UnityContext} cleanUnity={cleanUnity}/>} />    
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
