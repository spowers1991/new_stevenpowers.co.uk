import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const Form = () => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (
        <div className={`max-w-5xl mx-auto px-10 min-h-[500px] flex flex-col items-center w-full text-black py-3  ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
            <form className='w-full mx-auto sm:mr-16 sm:my-auto' name="contact" method="POST" onSubmit={handleFormSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <input className="rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="name" name="name" placeholder='Name' required />
                <input className="rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="email" name="email" placeholder='Email' required />
                <textarea rows="15" className="rounded block w-full my-8 p-2  focus:border-black border-2 hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="textarea" id="message" name="message" placeholder='Message' required/>
                <button className="group bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer hover:bg-black hover:text-white outline-none" type="submit" >
                    Send
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
                </button>            
            </form>
        </div>           
    )
}

const encode = (data) => {
    return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
 }

 function handleFormSubmit(event) {
    function formSubmitted(){
        document.querySelector('.submit-button').classList.add('form-submitted', "bg-black", "text-white", "pointer-events-none");
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