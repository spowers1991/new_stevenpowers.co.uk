import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import { useUnityContext } from "react-unity-webgl";

function App() {

  const { unload } = useUnityContext();
  
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
                <Route path="pages/webgl" element={<WebGL />} UnityUnload={UnityUnload}/>    
                <Route path="pages/contact" element={<Contact />}  />      
            </Routes>
          </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
