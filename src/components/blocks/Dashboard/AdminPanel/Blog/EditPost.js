import React, { useState } from 'react';
import axios from 'axios';

const EditPost = (props) => { 

  const [title, setTitle] = useState(props.post.title);
  const [files, setFiles] = useState('');
  const [content, setContent] = useState(props.post.content);
  const [savedImages, setSavedImages] = useState(props.post.images);
  const [addedImages, setAddedImages] = useState([]);
  const [submissionSuccess, setuserSubmissionSuccess] = useState('false');
  const [submissionFailure, setuserSubmissionFailure] = useState('false');

  function resetForm() {
    props.setSelectedPostId(null)
    setuserSubmissionSuccess(true);
    const timer = setTimeout(() => {
        props.setSelectedPostId(props.post._id)
        setuserSubmissionSuccess('')
      }, 50);
      return () => clearTimeout(timer);
  }

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


const handleDeleteImage = (post, index, type) => {
    if(type === 'added_image'){
        addedImages.splice(index, 1)
        files.splice(index, 1)
        setAddedImages(addedImages)
    } else {
        savedImages.splice(index, 1)
        setSavedImages(savedImages)
    }
    props.updatePost(post, props.post.content, files)
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('id', props.post._id);
  formData.append('title', title);
  for(let i = 0; i < files?.length; i++) {
    formData.append('images', files[i]);
  }
  formData.append('previouslyUploadedImages', savedImages);
  formData.append('content', content);
      
  axios.post(`${process.env.REACT_APP_BASEURL}/update-post`, formData)
      .then(response => {
          setuserSubmissionSuccess(true);
          setuserSubmissionFailure(false);
          props.updatePost(props.post, title, content, savedImages)
          resetForm() 
      })
      .catch(error => {
      setuserSubmissionFailure(true);
      if (error.response && error.response.status === 409) {
      }
      console.error(error);
      });
  };
  
  return (
    <div className='gap-5 mt-10'>
        <form className="w-full" onSubmit={handleSubmit}>
        <label className='font-bold'>
            Image upload:
          </label>
          <input
              className={'focus:outline-0 duration-200 rounded block w-full mt-2 mb-7 p-2  border-2 focus:border-black hover:border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black'}
              type="file"
              id="images"
              name="images"
              placeholder="Featured Image"
              multiple
              onChange={(e) => {setFiles(Array.from(e.target.files)); handleImageChange(e);}}
          />
          <div className="flex flex-wrap gap-3">
            {
                savedImages && savedImages.map((image, index) => (
                    <div key={index} className='group relative h-[min-content]' onClick={() => handleDeleteImage(props.post, index, 'saved_image')}>
                        <div className='absolute flex items-center inset-0 rounded cursor-pointer' >
                            <div className='absolute inset-0 opacity-0 group-hover:opacity-70 bg-black rounded duration-200'/>
                            <span className='!font-short-stack  relative text-white m-auto text-4xl opacity-0 group-hover:opacity-100 z-10'>
                                X
                            </span>
                        </div>
                        <img className={`w-[150px] rounded ${image ? 'block' : 'hidden'}`} src={`${process.env.REACT_APP_BASEURL+image}`} alt="" />
                    </div>
                ))
            }
            {
                addedImages && addedImages.map((image, index) => (
                    <div key={index} className='group relative h-[min-content]' onClick={() => handleDeleteImage(props.post, index, 'added_image')}>
                        <div className='absolute flex items-center inset-0 rounded cursor-pointer' >
                            <div className='absolute inset-0 opacity-0 group-hover:opacity-70 bg-black rounded duration-200'/>
                            <span className='!font-short-stack relative text-white m-auto text-4xl opacity-0 group-hover:opacity-100 z-10'>
                                X
                            </span>
                        </div>
                        <img className={`w-[150px] rounded ${image ? 'block' : 'hidden'}`} src={`${image}`} alt="" />
                    </div>
                ))
            }
          </div>
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
          <button className={`group tracking-[0.5px] !font-inter text-sm bg-black text-white rounded submit-button relative block w-full my-8 p-2  border-2 border-black font-bold uppercase cursor-pointer  hover:text-white outline-none ${submissionSuccess === true && 'pointer-events-none bg-[green]'}`} type="submit">
              {submissionSuccess === true ?
                  <span>
                      Post Updated
                  </span>
                  :
                  <span>
                      Update post
                  </span>
              }
              <div className={`bg-white absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 ${submissionSuccess === true && 'scale-x-100'} transition transition-gpu duration-200`}/>        
          </button>
      </form>
    </div>
  );
};

export default EditPost;
