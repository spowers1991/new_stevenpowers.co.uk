import React, { useState, useEffect } from 'react';
import Heading from './utility/Heading'
import CaptionReveal from './utility/CaptionReveal'
import { useLocation } from "react-router-dom";
import PersistentWebGL from '../components/blocks/WebGL'

const Page = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    const [showPersistentWebGL, setShowPersistentWebGL] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes('webgl')) {
      setShowPersistentWebGL(true);
    } else {
      setShowPersistentWebGL(false);
    }
  }, []);

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
            {showPersistentWebGL && <PersistentWebGL />}
        </div>           
    )
}

export default Page;

