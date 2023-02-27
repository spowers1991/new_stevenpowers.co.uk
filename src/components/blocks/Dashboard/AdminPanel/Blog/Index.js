import React, {useState} from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Blog = () => { 

  const [showForm, setShowForm] = useState('CreatePost');

  return (
    <div>
      <div className='w-full text-center mt-5 mb-16 flex gap-5'>
        <button  onClick={() => setShowForm('CreatePost')} className="w-1/2 mt-auto ml-auto text-xs group bg-black text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
            Create Post
            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${showForm === "CreatePost" && 'scale-x-100'} duration-200`}/>        
        </button>
        <button  onClick={() => setShowForm('EditPost')} className="w-1/2 mt-auto ml-auto text-xs group bg-black text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
            Edit Post
            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${showForm === "EditPost" && 'scale-x-100'} duration-200`}/>        
        </button>
      </div>
      {showForm === "CreatePost" &&
          <CreatePost />
      }
      {showForm === "EditPost" &&
        <Posts />
      }         
    </div>
  );
};

export default Blog;
