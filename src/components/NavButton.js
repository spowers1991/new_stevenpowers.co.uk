import React from "react";
import { Link } from 'react-router-dom';


const Button = ({ target, text, location }) => {
    return (
            <Link to={target} id="home-link" className="text-sm relative inline-block lg:mt-0 text-l bg-black text-white p-2 lg:p-5 mt-5 text-center font-inter font-bold uppercase group">
                    {text}
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full bg-blue h-1  ${location === target ? 'scale-x-100': 'scale-x-[0.25]'} transform group-hover:scale-x-100 transition transition-gpu duration-200`}></div>
            </Link>
         )
}

export default Button