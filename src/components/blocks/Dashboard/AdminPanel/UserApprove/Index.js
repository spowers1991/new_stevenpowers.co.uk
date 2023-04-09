import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useJwt } from 'react-jwt';

const UserApprove = () => { 

  
    const token = localStorage.getItem('token');
    const { decodedToken } = useJwt(token);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/get-users`);
        setUsers(response.data);
        };
        fetchUsers();
    }, []);

    
    const approveUser = async (this_id) => {
   
    const data = {
        id: this_id,
        response: 'approved'
    };
        
    axios.post(`${process.env.REACT_APP_BASEURL}/update-user`, data)
        .then(response => {
        //console.log(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    };

    const declineUser = async (this_id) => {
   
      const data = {
          id: this_id,
          response: 'declined'
      };
          
      axios.post(`${process.env.REACT_APP_BASEURL}/update-user`, data)
          .then(response => {
          console.log(response.data);
          })
          .catch(error => {
          console.error(error);
          });
      };

    const removeElement = (index) => {
      const newElements = [...users];
      newElements.splice(index, 1);
      setUsers(newElements);
    };

    return (
      (decodedToken?.account_level === 'admin' && users.some(user => user.account_level === 'requested')) &&
      <div className='w-full sm:w-1/3'>
        <div className='border-2 border-black rounded'>        
          <h3 className='font-inter text-lg font-semibold mb-5 bg-black text-white px-5 py-3'>
            New user requests
          </h3>
          <ul className='p-5'>
            {users && users.map((user, index) => (
              user.account_level === 'requested' &&
              <li key={user._id} className='mb-5'>
                <span className='font-semibold'>
                  username: <br/>
                </span> 
                {user.username}
                <div className='flex w-[fit-content] gap-3'>
                  <button onClick={() => {approveUser(user._id);removeElement(index)} } className="mt-3 tracking-[0.5px] !font-inter ml-auto text-xs group bg-[green] text-white rounded submit-button relative block w-full  p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                      Accept
                      <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
                  </button>
                  <button onClick={() => {declineUser(user._id);removeElement(index)}}className="mt-3 tracking-[0.5px] !font-inter mr-auto text-xs group bg-[#f00] text-white rounded submit-button relative block w-full  p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                      Decline
                      <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
                  </button>
                </div>           
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default UserApprove;