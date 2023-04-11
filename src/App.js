import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import Account from './pages/account'
import NotFound from './pages/404';

function App() {

  return (
    <div>
      <Router>
        <TopBar/>
        <Header/>
          <main>
            <Routes>
                <Route path="/" element={<Home />} />              
                <Route path="/webgl" element={<WebGL /> } />    
                <Route path="/contact" element={<Contact />}  />  
                <Route path="/my-account" element={<Account />}  />    
                <Route path="*" element={<NotFound />} /> 
            </Routes>
          </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
