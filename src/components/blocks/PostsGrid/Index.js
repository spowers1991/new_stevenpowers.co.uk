import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Button from '../../utility/Button';
import LightBox from "./LightBox";

const PostsGrid = (props) => {  

const { pathname } = useLocation();
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

return (  
    <div>  
        <div className={`mt-8 ${ state ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'} transform ease-in-out transition-all duration-200 delay-300`}>
            <div className="max-w-5xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-16">
                {posts && posts.map((post, index) => (
                    <div id={'post-'+index} className="group flex flex-col cursor-pointer -mt-2 pt-4" onClick={() => HandlePopUp(index)} key={index} role="presentation">
                        <div className="relative overflow-hidden mb-6">
                            <div className={`rounded absolute w-full h-full bg-black duration-300 opacity-0 group-hover:opacity-30 ${(open && index === SwiperSyncedKey && 'opacity-30')}`} />
                            <img className="w-full rounded" src="https://via.placeholder.com/224x224" alt="" />
                        </div>
                        <div className="flex">
                            <h4 className='w-3/4 mr-auto group relative !font-inter mb-auto pb-4 text-base font-semibold'>
                                {post.title}
                                <div className={`bg-[#aaa] absolute bottom-0 left-0 w-10 h-[2px] scale-x-[0.25] transform group-hover:scale-x-100  ${(open && index === SwiperSyncedKey && 'scale-x-100')} transition transition-gpu duration-200`}/>                      
                            </h4>
                            <div className="flex w-1/4">
                                <span className='ml-auto text-[#aaa]'>
                                    £{post.price}
                                </span>
                            </div>
                        </div>
                        <p className='!font-inter mb-auto mt-4 pb-4 text-sm text-[#222]'>
                            {post.description}
                        </p>
                        <Button className="mt-auto" solid={true} active={open && index === SwiperSyncedKey ? true : false} target="/pages/contact" text={`Button `+(index+1)} location={pathname}/>
                    </div>
                ))
                }
            </div>     
        </div>
        <LightBox data={posts} open={open} key={key} keyValue={key} HandlePopUp={HandlePopUp} SwiperSyncedKeyCallback={SwiperSyncedKeyCallback}/>
    </div>
         
    )

}

export default PostsGrid;