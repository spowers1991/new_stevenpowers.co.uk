import React, { useEffect } from 'react';
import Heading from './utils/Heading'
import CaptionReveal from './utils/CaptionReveal'
import { useLocation } from "react-router-dom";

const Page = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (    
        <div className={`overflow-hidden min-h-[550px] `}>
            <div className="max-w-5xl mx-auto px-10">
                <Heading title={props.title}/>
                <CaptionReveal caption={props.caption} />  
            </div>                              
            {
            props.blocks &&                                              
                props.blocks            
            }          
        </div>           
    )
}

export default Page;

