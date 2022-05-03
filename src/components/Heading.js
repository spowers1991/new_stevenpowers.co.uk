import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const Heading = (title) => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (        
        <h1 className={`text-white text-4xl font-bold mb-5 mx-10 ${ state ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[30px]"} transform ease-in-out transition-all duration-400`}>
            {title.title}
        </h1>          
    )
}

export default Heading;

