import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = (props) => { 

  const [title, setTitle] = useState('');
  const [files, setFiles] = useState('');
  const [content, setContent] = useState('');
  const [addedImages, setAddedImages] = useState([]);
  const [submissionSuccess, setuserSubmissionSuccess] = useState('false');
  const [submissionFailure, setuserSubmissionFailure] = useState('false');

  function resetForm() {
    setuserSubmissionSuccess(true)
    const timer = setTimeout(() => {
        setTitle('')
        setFiles(null)
        setContent('')
        setAddedImages([])
        setuserSubmissionSuccess('')
      }, 1000);
      return () => clearTimeout(timer);
  }

  const handleDeleteImage = (post, index, type) => {
    if(type === 'added_image'){
        addedImages.splice(index, 1)
        files.splice(index, 1)
        setAddedImages(addedImages)
    } 
};
    

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urlsArrays = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const urls = [];
  
      reader.onload = () => {
        const fileContents = reader.result;
        urls.push(fileContents);
        urlsArrays[i] = urls;
  
        if (urlsArrays.filter(Boolean).length === files.length) {
          // concatenate the new array with the existing addedImages array
          const newAddedImages = [...addedImages, ...urlsArrays.flat()];
          setAddedImages(newAddedImages);
        }
      };
  
      reader.readAsDataURL(files[i]);
    }
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setuserSubmissionSuccess('updating');

  const formData = new FormData();
  formData.append('title', title);
  for(let i = 0; i < files?.length; i++) {
    formData.append('images', files[i]);
  }
  formData.append('content', content);

  try {
    const result = await axios.post(`${process.env.REACT_APP_BASEURL}/create-post`, formData);
    setuserSubmissionFailure(false);
    await Promise.all([result]);
    resetForm();
  } catch (error) {
    setuserSubmissionFailure(true);
    if (error.response && error.response.status === 409) {
    }
    console.error(error);
  }
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
              id="images"
              name="images"
              placeholder="Images"
              multiple
              onChange={(e) => {setFiles(Array.from(e.target.files)); handleImageChange(e);}}
          />
          <div className="flex flex-wrap gap-3">
            {
                addedImages && addedImages.map((image, index) => (
                    <div key={index} className='group relative h-[min-content]' onClick={() => handleDeleteImage(props.post, index, 'added_image')}>
                        <div className='absolute flex items-center inset-0 rounded cursor-pointer' >
                            <div className='absolute inset-0 opacity-0 group-hover:opacity-70 bg-black rounded duration-200'/>
                            <span className='relative text-white m-auto text-4xl opacity-0 group-hover:opacity-100 z-10'>
                                X
                            </span>
                        </div>
                        <img className={`w-[150px] rounded ${image ? 'block' : 'hidden'}`} src={`${image}`} alt="" />
                    </div>
                ))
            }
          </div>
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
          <button className={`group !font-inter tracking-[0.5px] text-sm bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer hover:text-white outline-none ${submissionSuccess === true && 'pointer-events-none bg-[green]'}`} type="submit">
              {submissionSuccess === true ?
                  <span>
                      Post created
                  </span>
                  :
                  submissionSuccess === 'updating' ?
                  <span>
                      Updating post
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
