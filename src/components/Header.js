import React from "react";
import { useLocation  } from 'react-router-dom';
import NavButton from './NavButton';


const Header = () => {  

    const { pathname } = useLocation();

    return (
          
        <div className='flex w-full  text-white py-10'>
            <ul className='ml-auto flex gap-9 pr-10'>
                <li>
                    <NavButton target="/" text="Projects" location={pathname} />
                </li>
                <li>
                    <NavButton target="/pages/contact" text="Contact" location={pathname}/>
                </li>
            </ul>
        </div>    
                   
    )
}

export default Header;