import React, { useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import Heading from '../components/Heading'
import CaptionReveal from './CaptionReveal'

const ContentBox = (props) => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (    
        <div className='mx-10 '>   
            <div className={`overflow-hidden min-h-[550px] w-full bg-black transform ease-in-out transition-all duration-300`}>
                <div className='relative top-0 w-full h-10 bg-white'></div>

                <div className={`relative inset-0 transform ease-in-out transition-all duration-200 origin-left `}>
                    <div className='flex flex-row'>
                        <div className={`p-12 text-lg text-white ${props.form ? 'w-1/2' : 'w-full' } `}>
                            . . /<Heading title={props.title}/>
                                    <CaptionReveal content={props.content} /> 
                                    {console.log(props)}                                 
                        </div>
                        {
                        props.form &&   
                            <div className='w-1/2'>                              
                                {props.form}
                            </div>
                        }
                    </div>
                    {
                    props.slider &&   
                        <div className={`h-[250px] mb-10 ml-20 pl-3 transform ease-in-out transition-all duration-700 delay-700 origin-left ${state ? 'translate-x-[0%]' : 'translate-x-[100%]'} `}>
                            {props.slider} 
                        </div>
                    }
                </div>

                <div className={`z-30 absolute bottom-0 w-full h-2`}>
                     <div className={`z-20 absolute bottom-0 w-full h-full bg-white transform ease-in-out transition-all duration-400 origin-left mx-auto ${state ? 'scale-x-100' : 'scale-x-[0%]'} `}></div>
                </div>
                
            </div>     
        </div>      
    )
}

export default ContentBox;

