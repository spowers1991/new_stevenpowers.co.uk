import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'
import Account from './pages/account'

function App() {

  const [posts, setPosts] = useState(undefined);
    useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
        .then(res => res.json())
        .then(data => setPosts(data.products));
    }, []);

  return (
    <div>
      <Router>
        <TopBar/>
        <Header/>
          <main>
            <Routes>
                <Route path="/" element={<Home posts={posts}/>} />              
                <Route path="/webgl" element={<WebGL /> } />    
                <Route path="/contact" element={<Contact />}  />  
                <Route path="/my-account" element={<Account />}  />     
            </Routes>
          </main>
        <Footer />    
      </Router>
    </div>
  );
}

export default App;
