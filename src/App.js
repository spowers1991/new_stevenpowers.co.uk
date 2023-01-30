import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'

function App() {




  
  useEffect(() => {
  
 
    return () => {
          (!window.location.pathname.includes('webgl') ) &&
          window.document.removeEventListener('keypress', window.location.pathname)
          const scripts = document.getElementsByTagName('script')
          const scriptsArray = [...scripts]
          scriptsArray.map((script) => (
            script.src.includes("solar-system-build") &&
            script.remove()
        ))
        console.log('test')
      }
    });

  return (
    <div>
      <Router>
        <Header/>
   
            <main>
              <Routes>
                  <Route path="/" element={<Home />} />              
                  <Route path="pages/home" element={<Home />} />
                  <Route path="pages/webgl" element={<WebGL /> } />    
                  <Route path="pages/contact" element={<Contact />}  />      
              </Routes>
            </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
