import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const Form = () => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (
        <div className={`min-h-[500px] flex flex-col items-center w-full bg-black text-white py-3 px-10 ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-700 delay-700`}>
            <form className='w-full mr-16 my-auto' name="contact" method="POST" data-netlify="true"  onSubmit={handleFormSubmit}>
                <input className="block w-full my-8 p-2 bg-black border-2 border-white border-dashed focus:border-solid focus:outline-none focus:placeholder:text-white" type="text" id="name" name="name" placeholder='Name' required />
                <input className="block w-full my-8 p-2 bg-black border-2 border-white border-dashed focus:border-solid focus:outline-none focus:placeholder:text-white" type="text" id="email" name="email" placeholder='Email' required />
                <textarea className="block w-full my-8 p-2 bg-black border-2 border-white border-dashed focus:border-solid focus:outline-none focus:placeholder:text-white" type="textarea" id="message" name="message" placeholder='Message' required/>
                <button className="submit-button relative block w-full my-8 p-2  border-2 border-white text-white font-bold uppercase cursor-pointer hover:bg-white hover:text-black" type="submit" >Send</button>            
            </form>
        </div>           
    )
}

const encode = (data) => {
    return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
 }

 function handleFormSubmit(event) {
    function formSubmitted(){
        document.querySelector('.submit-button').classList.add('form-submitted', "bg-red", "pointer-events-none");
        document.querySelector('.submit-button').innerHTML = "Form Submitted";
    }
    event.preventDefault();
    const data = [...event.target.elements].filter(element => Boolean(element.name)).reduce((json, element) => {
       json[element.name] = element.value;
       return json;
    }, {});
    fetch(event.target.action, {
       method: "POST",
       headers: {
          "Content-Type": "application/x-www-form-urlencoded"
       },
       body: encode(data),
    }).then(() => formSubmitted()).catch(error => alert(error));
 }

export default Form;