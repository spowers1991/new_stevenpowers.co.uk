import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import SearchFilter from '../../../../utils/SearchFilter';
import Pagination from '../../../../utils/Pagination';
import Post from './Post'

const Posts = (props) => {  

    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/get-posts`);
        setPosts(response.data);
      }, []);
      
      useEffect(() => {
        fetchPosts();
      }, [fetchPosts]);

    // This function updates content in the view if the user edits a post, it for UX and makes no requests
    const updatePost = useCallback((editedPost, NewTitle, newContent, newImages) => {
        fetchPosts();
        const post = posts.find((post) => post._id === editedPost._id);
        if (post) {
          post.title = NewTitle;
          post.content = newContent;
          post.images = newImages;
        }
        return post;
    }, [posts, fetchPosts]); 

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(posts?.filter(post => post?.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, posts]);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [currentItems, setCurrentItems] = useState();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        setCurrentItems(filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem))
    }, [filteredData, indexOfFirstItem, indexOfLastItem]);

    
    const removeElement = (index) => {
        const newElements = [...filteredData];
        newElements.splice(index, 1);
        setPosts(newElements);
    };

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
        setUseFilter(false);
    }

    const [useFilter, setUseFilter] = useState(false);

    function filterController(state) {
        setUseFilter(state);
    }
  
    const slicedfilteredData = filteredData && filteredData.slice(0, 8);
    

    return ( 
        <div>
            <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData} posts={posts} filterController={filterController}/>
            {useFilter === false ?
                currentItems && currentItems.map((post, index) => 
                        <Post key={post._id} post={post} index={index} updatePost={updatePost} removeElement={removeElement}/>
                    )
                :
                    slicedfilteredData && slicedfilteredData.map((post, index) => (
                        <Post key={post._id} post={post} index={index} updatePost={updatePost} removeElement={removeElement}/>
                )
            )}   
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredData && filteredData.length}
                onPageChange={handlePageChange}
            />      
        </div> 
    );
};
        
export default Posts;
        