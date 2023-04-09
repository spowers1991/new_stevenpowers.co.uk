import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import Post from "./Post";
import SearchFilter from '../../utils/SearchFilter';
import LightBox from "./LightBox";
import Pagination from '../../utils/Pagination';

const PostsGrid = () => {  

const location = useLocation();
const [state, setState] = useState(false)

useEffect(() => {
    setState(true)
}, [location]);

const [posts, setPosts] = useState(undefined);

useEffect(() => {
  const fetchPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASEURL}/get-posts`);
  setPosts(response.data);
  };
  fetchPosts();
},[]);

const [open, setOpen] = useState(false)
function handleSetOpen() {
    setOpen(!open)
}

const [key, setKey] = useState(0);

function HandlePopUp(index) {
    setKey(index)
    handleSetOpen()
}

const [SwiperSyncedKey, setSwiperSyncedKey] = useState(0);

function SwiperSyncedKeyCallback(index) {
    setSwiperSyncedKey(index)
}

const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState([]);

useEffect(() => {
    if (Array.isArray(posts)) {
        setFilteredData(posts?.filter(post => post?.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
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
        <div className={`max-w-5xl mx-auto mt-8 px-10 ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
            <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData} posts={posts} filterController={filterController}/>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-16 mt-10">
                {useFilter === false ?
                currentItems && currentItems.map((post, index) => (
                    <Post index={index} post={post} key={index} SwiperSyncedKey={SwiperSyncedKey} HandlePopUp={HandlePopUp} open={open}  SwiperSyncedKeyCallback={SwiperSyncedKeyCallback}/>
                ))
                :
                slicedfilteredData && slicedfilteredData.map((post, index) => (
                    <Post index={index} post={post} key={index} SwiperSyncedKey={SwiperSyncedKey} HandlePopUp={HandlePopUp} open={open}  SwiperSyncedKeyCallback={SwiperSyncedKeyCallback}/>
                ))
                }
            </div>   
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredData && filteredData.length}
                onPageChange={handlePageChange}
            />  
        </div>
        <LightBox data={useFilter === false ? currentItems : slicedfilteredData} open={open} key={key} keyValue={key} HandlePopUp={HandlePopUp} SwiperSyncedKeyCallback={SwiperSyncedKeyCallback}/>
    </div>         
    )
}

export default PostsGrid;