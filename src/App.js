import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home'
import Contact from './pages/contact'
import WebGL from './pages/webgl'

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
        <Header/>
          <main>
            <Routes>
                <Route path="/" element={<Home posts={posts}/>} />              
                <Route path="pages/home" element={<Home posts={posts}/>} />
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
