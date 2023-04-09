import React from "react";
import { useLocation  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../images/account_icon.svg'

const TopBar = () => {  

    const { pathname } = useLocation();
    
    return (
          
        <nav className='flex w-full text-black py-3 max-w-5xl px-10 mx-auto'>
            <ul className='ml-auto flex gap-9 '>
                <li>
                    <Link to="/my-account"  className={`text-4xl duration-200 ${pathname === '/my-account' && 'text-[green]'}`} location={pathname} > 
                        <AccountIcon width="25" />
                    </Link>
                </li>
            </ul>
        </nav>    
                   
    )
}

export default TopBar;