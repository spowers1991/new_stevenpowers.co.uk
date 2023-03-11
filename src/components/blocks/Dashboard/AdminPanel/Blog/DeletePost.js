import React from 'react';
import axios from 'axios';

const DeletePost = (props) => {  

    const data = {
    id: props.post._id
    };
    
    function deletePost(post) {
    axios.delete(`${process.env.REACT_APP_BASEURL}/delete-post/${data.id}`)
        .then(response => {
        props.removeElement(props.index)
        })
        .catch(error => {
        if (error.response && error.response.status === 409) {
            // handle 409 error
        }
        console.error(error);
        });
    };
    

    return ( 
    <div className='border-2 text-black rounded p-5 pt-10 text-center sm:text-right mt-5'>
        Are you sure you want to <span className='text-[#f00]  font-bold'>permenantely delete</span> {props.post.title}
        <div className='flex w-[fit-content] gap-5 m-auto sm:m-[unset] sm:ml-auto'>
            <button onClick={() => {deletePost()} } className=" w-[100px] mt-3 text-xs group bg-black text-white rounded submit-button relative block   p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                Yes
                <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
            </button>
            <button onClick={() => {props.postDelete(undefined)} } className="w-[100px]  mt-3 text-xs group bg-black text-white rounded submit-button relative block   p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none">
                No
                <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>        
            </button>
        </div> 
    </div>
    );
};
        
export default DeletePost;
        