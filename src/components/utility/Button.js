import React from "react";
import { Link } from 'react-router-dom';


const Button = ({ target, text, large, location, solid, active }) => {
    return (
            <Link to={target} className={`rounded ${large ? '' : 'text-xs'} relative inline-block lg:mt-0 text-l ${solid ? 'bg-black text-white p-3' : 'text-black  py-3'}   mt-5 text-center group`}>
                    {text}
                    <div className={`${solid ? 'bg-white': 'bg-black'} absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 ${active && 'scale-x-100'}  ${location === target ? 'scale-x-100': 'scale-x-[0.25]'} transition transition-gpu duration-200`}/>
            </Link>
         )
}

export default Button