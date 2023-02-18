import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login' 
import Register from './Register' 
import AdminPanel from './AdminPanel/Index' 

const Account = () => {  

const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function LogIn() {
    setLoggedIn(true);
  }  

  function LogOut() {
    console.log('test')
    setLoggedIn(false);
    localStorage.clear()
  }  

  const location = useLocation();
  const [state, setState] = useState(false)

  useEffect(() => {
    setState(true)
  }, [location]);

  return (
    <div className={`max-w-5xl mx-auto px-10 min-h-[500px] flex w-full gap-8 text-black py-3  ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
      {!loggedIn &&
        <div className="w-1/2">
            <Register />
        </div>
      }
      {!loggedIn &&
        <div className="w-1/2">
          <Login logIn={LogIn}/>   
        </div>
      }
      {loggedIn &&
        <div className="w-full ">
          <div className="border-b-2  mb-5 pb-5 text-right cursor-pointer" onClick={() => LogOut()} >
            Logout 
          </div>
          <AdminPanel />
        </div>
      }
    </div>
  );
};

export default Account;
