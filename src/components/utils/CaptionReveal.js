import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const CaptionReveal = (props) => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (        
        <p className={`text-black ${ state ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"} transform ease-in-out transition-all duration-300 delay-100`}>
            {props.caption}
        </p>          
    )
}

export default CaptionReveal;

