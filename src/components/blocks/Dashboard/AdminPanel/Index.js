import React from 'react';
import UserApprove from './UserApprove';

const AdminPanel = () => { 
  

  return (
    <div className='flex gap-5 mt-10'>
      <div className='w-2/3 border-black border-2 text-black rounded p-5'>
        <h1 className='text-2xl font-semibold mb-10'>
            Admin Panel
        </h1>
      </div>
      <div className='w-1/3'>
        <UserApprove />
      </div>
    </div>
  );
};

export default AdminPanel;
