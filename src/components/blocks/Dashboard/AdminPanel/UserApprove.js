import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserApprove = () => { 

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
        console.log(response.data);
        };
        fetchUsers();
    }, []);

    const approveUser = async (this_id) => {
   
    const data = {
        id: this_id,
    };
        
    axios.post('http://localhost:5000/update', data)
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    };

    return (
      <div className='border-2 border-black rounded'>
        {users.some(user => user.account_level === 'requested') &&
          <h3 className='text-xl font-semibold mb-5 bg-black text-white p-3'>
            New user requests
          </h3>
        }
        <ul className='p-5'>
          {users && users.map((user) => (
            user.account_level === 'requested' &&
            <li key={user._id} className='mb-5'>
              <span className='font-semibold'>
                username: <br/>
              </span> 
              {user.username}
              <div className='flex w-[fit-content] gap-3'>
                <button onClick={() => approveUser(user._id)} className="mt-3 ml-auto text-xs group bg-black text-white rounded submit-button relative block w-full  p-2  border-2 border-black font-bold uppercase cursor-pointer hover:bg-black hover:text-white outline-none">
                    Accept
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
                </button>
                <button className="mt-3 mr-auto text-xs group bg-black text-white rounded submit-button relative block w-full  p-2  border-2 border-black font-bold uppercase cursor-pointer hover:bg-black hover:text-white outline-none">
                    Decline
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
                </button>
              </div>           
            </li>
          ))}
        </ul>
      </div>
    );
};

export default UserApprove;