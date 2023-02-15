import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {  

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();

const data = {
    username: username,
    password: password,
    email: email
};
    
axios.post('http://localhost:5000/user', data)
    .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    console.error(error);
    });
};

return (
    <form className="w-full" onSubmit={handleSubmit}>
        <input
            className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <input
            className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <button className="group bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer hover:bg-black hover:text-white outline-none" type="submit" >
            Register
            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
        </button>
    </form>
    )
}

export default Register;