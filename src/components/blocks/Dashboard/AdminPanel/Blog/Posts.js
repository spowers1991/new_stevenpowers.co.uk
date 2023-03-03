import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import SearchFilter from '../../../../utils/SearchFilter';

const Posts = (props) => {  

    const [posts, setPosts] = useState([]);

    // This function updates content in the view if the user edits a post, it for UX and makes no requests
    const updatePost = useCallback((editedPost, newContent, newImage) => {
        const post = posts.find((post) => post._id === editedPost._id);
        if (post) {
          post.content = newContent;
          post.featuredImage = newImage;
        }
        return post;
    }, [posts]);  
  
    useEffect(() => {
        const fetchPosts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/get-posts`);
        setPosts(response.data);
        };
        fetchPosts();
    },[updatePost]);  

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

    
    const [deletePost, setDeletePost] = useState(undefined);
    
    function postDelete(post){
        setDeletePost(post)
    }

    const removeElement = (index) => {
        const newElements = [...filteredData];
        newElements.splice(index, 1);
        setPosts(newElements);
    };

    

    return ( 
        <div>
            <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData} posts={posts} />
            {filteredData && filteredData.map((post, index) => 
                <div key={post._id} className="mb-5 border-b-2 pb-5">
                    <div className='block sm:flex w-full gap-3 items-center'>
                    <h3 className='font-semibold text-xl'>
                        {
                        post['title']
                        }
                    </h3>
                    <div className='flex w-full sm:w-[50%] mt-5 sm:mt-0 ml-auto gap-5'>
                        <button onClick={() => {setSelectedPostId(post._id);closeThisPost(post._id)}} className="w-[50%] mt-auto ml-auto text-xs group bg-[green] text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                            {(selectedPostId && selectedPostId === post._id === true) ?
                            <span>
                                Stop editing
                            </span>
                            :
                            <span>
                                edit post
                            </span>
                            }
                            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${(selectedPostId && selectedPostId === post._id === true) && 'scale-x-100'} duration-200`}/>        
                        </button>
                        <button onClick={() => {postDelete(post)}} className="w-[50%] mt-auto ml-auto text-xs group bg-[red] text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                            Delete
                            <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${(deletePost?._id === post._id === true) && 'scale-x-100'} duration-200`}/>        
                        </button>
                    </div>
                    </div>
                    {(deletePost && deletePost?._id === post._id) &&
                    <DeletePost post={deletePost && deletePost} postDelete={postDelete} removeElement={removeElement} index={index}/>
                    }
                    {(selectedPostId && selectedPostId === post._id) &&
                    <EditPost post={post} updatePost={updatePost}/>
                    }  
                </div> 
            )}         
        </div> 
    );
};
        
export default Posts;
        