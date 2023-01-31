import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import PersistentWebGL from './components/blocks/WebGL'

function App() {

  return (
    <div>
      <Router>
        <Header/>
          <main>
            <Routes>
                <Route path="/" element={<Home />} />              
                <Route path="pages/home" element={<Home />} />
                <Route path="pages/webgl" exact={false} element={<WebGL /> } />    
                <Route path="pages/contact" element={<Contact />}  />      
            </Routes>
            <PersistentWebGL/>
          </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
