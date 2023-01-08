import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const Heading = (props) => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (      
        <h1 className={`text-black text-5xl mb-5 ${ state ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[30px]"} transform ease-in-out transition-all duration-200`}>
            {props.title}
        </h1>        
    )
}

export default Heading;

