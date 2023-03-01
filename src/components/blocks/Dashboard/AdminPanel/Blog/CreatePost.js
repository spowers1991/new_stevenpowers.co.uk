import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = (props) => { 

  const [title, setTitle] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [submissionSuccess, setuserSubmissionSuccess] = useState('false');
  const [submissionFailure, setuserSubmissionFailure] = useState('false');

  function resetForm() {
    const timer = setTimeout(() => {
        setTitle('')
        setFeaturedImage(null)
        setContent('')
        setuserSubmissionSuccess('')
      }, 2000);
      return () => clearTimeout(timer);
  }
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('featuredImage', featuredImage);
  formData.append('content', content);
      
  axios.post(`${process.env.REACT_APP_BASEURL}/create-post`, formData)
      .then(response => {
          setuserSubmissionSuccess(true);
          setuserSubmissionFailure(false);
          resetForm();
      })
      .catch(error => {
      setuserSubmissionFailure(true);
      if (error.response && error.response.status === 409) {
      }
      console.error(error);
      });
  };

  return (
    <div className='flex gap-5 mt-10'>
        <form className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
              className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
          <input
              className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
              type="file"
              id="featuredImage"
              name="featuredImage"
              placeholder="Featured Image"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
          <textarea
              className={'focus:outline-0 duration-200 rounded block w-full my-8 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
              type="text"
              rows="10"
              id="content"
              name="content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
          />
          {submissionFailure === true &&
          <div className='text-[#f00] mb-3'>
              There was an error submitting your request
          </div>
          }
          <button className={`group text-sm bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer hover:text-white outline-none ${submissionSuccess === true && 'pointer-events-none bg-[green]'}`} type="submit">
              {submissionSuccess === true ?
                  <span>
                      Post created
                  </span>
                  :
                  <span>
                      Create post
                  </span>
              }
              <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 ${submissionSuccess === true && 'scale-x-100'} transition transition-gpu duration-200`}/>        
          </button>
      </form>
    </div>
  );
};

export default CreatePost;
