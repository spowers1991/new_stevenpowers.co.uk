import React from 'react';
import UserApprove from './UserApprove/Index';
import Posts from './Blog/Index';

const AdminPanel = () => { 
  

  return (
    <div className='flex-col-reverse sm:flex-row flex gap-5 mt-10'>
      <div className='w-full border-black border-2 text-black rounded p-5 mb-10 sm:mb-0'>
        <h1 className='text-2xl font-semibold mb-10'>
            Admin Panel
        </h1>
        <Posts />
      </div>
      <UserApprove />
    </div>
  );
};

export default AdminPanel;
