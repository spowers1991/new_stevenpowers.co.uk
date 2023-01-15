import React from "react";
import { useLocation  } from 'react-router-dom';
import Button from './utility/Button';


const Header = () => {  

    const { pathname } = useLocation();

    return (
          
        <header className='flex w-full text-white py-10 max-w-5xl px-10 mx-auto'>
            <ul className='ml-auto flex gap-9 '>
                <li>
                    <Button target="/" text="Json data" large={true} location={pathname} />
                </li>
                <li>
                    <Button target="/pages/webgl" text="WebGL" large={true} location={pathname}/>
                </li>
                <li>
                    <Button target="/pages/contact" text="Contact" large={true} location={pathname}/>
                </li>
            </ul>
        </header>    
                   
    )
}

export default Header;