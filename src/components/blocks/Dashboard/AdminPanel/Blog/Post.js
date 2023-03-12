import React, { useState } from 'react';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const Posts = (props) => {  

    const [selectedPostId, setSelectedPostId] = useState(undefined);

    function closeThisPost(post_id) {
    post_id === selectedPostId &&
    setSelectedPostId(undefined);
    }

    const [deletePost, setDeletePost] = useState(undefined);
    
    function postDelete(post){
        setDeletePost(post)
    }

    return ( 
        <div className="mb-5 border-b-2 pb-5">
            <div className='block sm:flex w-full gap-3 items-center'>
            <h3 className='font-semibold text-xl'>
                {
                props.post['title']
                }
            </h3>
            <div className='flex w-full sm:w-[50%] mt-5 sm:mt-0 ml-auto gap-5'>
                <button onClick={() => {setSelectedPostId(props.post._id);closeThisPost(props.post._id)}} className="w-[50%] mt-auto ml-auto text-xs group bg-[green] text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                    {(selectedPostId && selectedPostId === props.post._id === true) ?
                    <span>
                        Stop editing
                    </span>
                    :
                    <span>
                        edit post
                    </span>
                    }
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${(selectedPostId && selectedPostId === props.post._id === true) && 'scale-x-100'} duration-200`}/>        
                </button>
                <button onClick={() => {postDelete(props.post)}} className="w-[50%] mt-auto ml-auto text-xs group bg-[red] text-white rounded submit-button relative block p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                    Delete
                    <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200 ${(deletePost?._id === props.post._id === true) && 'scale-x-100'} duration-200`}/>        
                </button>
            </div>
            </div>
            {(deletePost && deletePost?._id === props.post._id) &&
            <DeletePost post={deletePost && deletePost} postDelete={postDelete} removeElement={props.removeElement} index={props.index}/>
            }
            {(selectedPostId && selectedPostId === props.post._id) &&
            <EditPost post={props.post} updatePost={props.updatePost} setSelectedPostId={setSelectedPostId}/>
            }  
        </div>
    )
}

export default Posts;