import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login' 
import Register from './Register' 
import AdminPanel from './AdminPanel/Index' 
import { useJwt } from 'react-jwt';

const Account = () => {  

const [loggedIn, setLoggedIn] = useState(false);
const [showForm, setShowForm] = useState('login');

const token = localStorage.getItem('token');
const { decodedToken } = useJwt(token);

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
        <div className="w-full">
          <div className='w-full text-center mt-5 flex gap-5'>
            <button onClick={() => setShowForm('register')} className="w-1/2 mt-auto ml-auto text-xs group bg-black text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                Register
                <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${showForm === "register" && 'scale-x-100'} duration-200`}/>        
            </button>
            <button onClick={() => setShowForm('login')} className="w-1/2 mt-auto ml-auto text-xs group bg-black text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                Login
                <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${showForm === "login" && 'scale-x-100'} duration-200`}/>        
            </button>
          </div>
          <div className='border-black border-2 text-black rounded p-5 mt-10'>
            {showForm === "register" &&
                <Register />
            }
            {showForm === "login" &&
                <Login logIn={LogIn}/>   
            }
          </div>   
        </div>
      }
      {loggedIn &&
        <div className="w-full">
          <div className="border-b-2  mb-5 pb-5 text-right cursor-pointer">
            <button onClick={() => LogOut()} className=" mt-3 ml-auto text-base group text-black rounded submit-button relative block  p-2  cursor-pointer outline-none">
                Logout
                <div className={`bg-black absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
            </button>
          </div>
          {decodedToken?.account_level === 'approved' || decodedToken?.account_level === 'admin'?
          <AdminPanel />
          :
          <div>
            Please wait to be approved by admin. 
            You can contact the admin using the contact page.
          </div>
          }
        </div>
      }
    </div>
  );
};

export default Account;
