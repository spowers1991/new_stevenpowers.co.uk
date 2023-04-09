import React from "react";
import { useLocation  } from 'react-router-dom';
import Button from './utils/Button';


const Header = () => {  

    const { pathname } = useLocation();

    return (
          
        <header className='flex w-full pb-10 max-w-5xl px-10 mx-auto'>
            <ul className='ml-auto flex gap-9 '>
                <li>
                    <Button target="/" text="Blog" large={true} location={pathname} />
                </li>
                <li>
                    <Button target="/webgl" text="WebGL" large={true} location={pathname}/>
                </li>
                <li>
                    <Button target="/contact" text="Contact" large={true} location={pathname}/>
                </li>
            </ul>
        </header>    
                   
    )
}

export default Header;