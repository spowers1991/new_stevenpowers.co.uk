import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const CaptionReveal = (content) => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (        
        <p className={`text-white ${ state ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[5px]"} transform ease-in-out transition-all duration-700 delay-200 pl-20`}>
            {content.content}
        </p>          
    )
}

export default CaptionReveal;

