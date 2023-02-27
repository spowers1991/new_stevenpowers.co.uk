import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {  

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [userTaken, setuserTaken] = useState('false');
const [submissionSuccess, setuserSubmissionSuccess] = useState('false');
const [submissionFailure, setuserSubmissionFailure] = useState('false');

const handleSubmit = async (e) => {
e.preventDefault();

const data = {
    username: username,
    password: password,
    email: email,
    account_level: 'requested'
};
    
axios.post(`${process.env.REACT_APP_BASEURL}/user-registration`, data)
    .then(response => {
        setuserSubmissionSuccess(true);
        setuserSubmissionFailure(false);
        setuserTaken(false);
    })
    .catch(error => {
    setuserSubmissionFailure(true);
    if (error.response && error.response.status === 409) {
        setuserTaken(true);
    }
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
        {submissionFailure === true &&
        <div className='text-[#f00] mb-3'>
            There was an error submitting your request
        </div>
        }
        {userTaken === true &&
        <div className='text-[#f00]'>
            User already taken please choose another username or email
        </div>
        }
        <button className={`group bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer hover:text-white outline-none ${submissionSuccess === true && 'scale-x-100 pointer-events-none bg-[green]'}`} type="submit">
            {submissionSuccess === true ?
                <span>
                    Request submitted
                </span>
                :
                <span>
                    Register
                </span>
            }
            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 ${submissionSuccess === true && 'scale-x-100'} transition transition-gpu duration-200`}/>        
        </button>
    </form>
    )
}

export default Register;