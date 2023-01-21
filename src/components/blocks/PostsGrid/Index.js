import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Post from "./Post";
import LightBox from "./LightBox";

const PostsGrid = (props) => {  

const location = useLocation();
const [state, setState] = useState(false)

useEffect(() => {
    setState(true)
}, [location]);

const posts = props.postData

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
    setFilteredData(posts?.filter(post => post?.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, posts]);


return (  
    <div>  
        <div className={`mt-8 ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
            <div className="max-w-5xl mx-auto px-10 mb-5">
                <input className="rounded block w-full my-8 p-2  border-2 border-black border-solid focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black text-sm" placeholder='Type to search...'  type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-16">
                {filteredData && filteredData.map((post, index) => (
                    <Post index={index} post={post} key={index} SwiperSyncedKey={SwiperSyncedKey} HandlePopUp={HandlePopUp} open={open}/>
                ))
                }
            </div>     
        </div>
        <LightBox data={filteredData} open={open} key={key} keyValue={key} HandlePopUp={HandlePopUp} SwiperSyncedKeyCallback={SwiperSyncedKeyCallback}/>
    </div>         
    )
}

export default PostsGrid;