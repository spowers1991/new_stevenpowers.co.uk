import React from "react";
import { useLocation  } from 'react-router-dom';
import Button from './utility/Button';

const TopBar = () => {  

    const { pathname } = useLocation();

    return (
          
        <nav className='flex w-full text-black py-3 max-w-5xl px-10 mx-auto'>
            <ul className='ml-auto flex gap-9 '>
                <li>
                    <Button target="/my-account" text="Account" large={true} location={pathname} />
                </li>
            </ul>
        </nav>    
                   
    )
}

export default TopBar;