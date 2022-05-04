import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleFonts from './fonts/GoogleFonts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home'
import Contact from './contact'


function App() {

  return (
    <div>
      <Router>
        <GoogleFonts/>
        <Header/>
          <main>
            <Routes>
                <Route path="/" element={<Home />} />              
                <Route path="home" element={<Home />} />  
                <Route path="contact" element={<Contact />}  />      
            </Routes>
          </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
