import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import SearchFilter from '../../../../utils/SearchFilter';

const Posts = () => { 
  
const [posts, setPosts] = useState([]);

useEffect(() => {
    const fetchPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/posts`);
    setPosts(response.data);
    };
    fetchPosts();
});

const [showForm, setShowForm] = useState('CreatePost');
const [selectedPostId, setSelectedPostId] = useState(undefined);

function closeThisPost(post_id) {
  post_id === selectedPostId &&
  setSelectedPostId(undefined);
}

const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState([]);

useEffect(() => {
    setFilteredData(posts?.filter(post => post?.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, posts]);

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
        <div>
         <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData} posts={posts} />
            {filteredData && filteredData.map((post) => 
              <div key={post._id} className="mb-5 border-b-2 pb-5">
                  <div className='flex w-full gap-3 items-center'>
                    <h3 className='font-semibold text-xl'>
                      {
                        post['title']
                      }
                    </h3>
                    <button onClick={() => {setSelectedPostId(post._id);closeThisPost(post._id)}} className="w-[25%] mt-auto ml-auto text-xs group bg-[green] text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                      {(selectedPostId && selectedPostId === post._id === true) ?
                        <span>
                          Stop editing Post
                        </span>
                        :
                        <span>
                          edit post
                        </span>
                      }
                        <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${(selectedPostId && selectedPostId === post._id === true) && 'scale-x-100'} duration-200`}/>        
                    </button>
                  </div>
                  {(selectedPostId && selectedPostId === post._id) &&
                    <EditPost data={post}/>
                  }
              </div> 
            )}
        </div>            
        }         
    </div>
  );
};

export default Posts;
