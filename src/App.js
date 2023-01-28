import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {

  const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
    loaderUrl: "/build/solar-system-build.loader.js",
    dataUrl: "/build/solar-system-build.data.br",
    frameworkUrl: "/build/solar-system-build.framework.js.br",
    codeUrl: "/build/solar-system-build.wasm.br",
  });
  
  async function UnityUnload() {
    await unload();
    // Ready to navigate to another page.
  }

  return (
    <div>
      <Router>
        <Header/>
            <main>
              <Routes>
                  <Route path="/" element={<Home />} />              
                  <Route path="pages/home" element={<Home />} />
                  <Route path="pages/webgl" element={<WebGL />} UnityUnload={UnityUnload} canvas={<Unity className="w-full h-full" unityProvider={unityProvider} isLoaded={isLoaded} loadingProgression={loadingProgression}/>}/>    
                  <Route path="pages/contact" element={<Contact />}  />      
              </Routes>
            </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
