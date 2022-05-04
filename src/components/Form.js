import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

const Form = () => {  

    const location = useLocation();
    const [state, setState] = useState(false)

    useEffect(() => {
        setState(true)
    }, [location]);

    return (
        <form name="contact" netlify>
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>           
    )
}



export default Form;