import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const NotFound = () => {

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (
        <div className={`max-w-5xl mx-auto mt-8 px-10 ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
            <div className='mt-10 border-b-2 pb-1 border-dashed hover:border-solid hover:border-black w-fit duration-100'>
                <Link to="/">
                    Back to the homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;