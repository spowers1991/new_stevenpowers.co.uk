import React, { useState, useEffect } from 'react';
import Button from '../../utils/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard, Mousewheel } from "swiper";
import { HashLink as Link } from 'react-router-hash-link';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../css/swiper.css";


const LightBox = (props) => {  

    let active=false;
    props.open ? active = true : active = false;

    const posts = props.data

    const [animate, setAnimate] = useState(false)
    function resetLightBox() {
        setAnimate(false)
        active=false;
    }

    useEffect(() => {
        setTimeout(() => {
            active &&
            setAnimate(true)
          }, 50);
      }, [active]);
  
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return (
        active &&    
        <Swiper className={`!fixed !w-full !h-full !inset-0 !z-50 transition transform duration-300 top-0 ${animate ? 'pointer-events-all opacity-100' : 'pointer-events-none opacity-0'}`}
            pagination={{
                el: '.progress',
                type: "progressbar",
            }}    
            spaceBetween={0}
            slidesPerView={1}
            keyboard={{ enabled: true }}
            mousewheel={true}
            navigation={true}
            resistanceRatio={0}
            modules={[Pagination, Navigation, Keyboard, Mousewheel]}
            initialSlide={props.keyValue}
            onSlideChange={(e) => props.SwiperSyncedKeyCallback(e.realIndex)}
            >  
            <button className="drop-shadow-2xl  group absolute bg-black text-white rounded-xl py-3 px-5 top-[unset] sm:top-5 bottom-20 sm:bottom-[unset] right-5 text-3xl z-20 hover:bg-white hover:text-black duration-500" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}}>
                X
                <div className='bg-white group-hover:bg-black absolute bottom-3 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-[60%] transition transition-gpu duration-200'>

                </div>
            </button>
            {posts && posts.map((post, index) => (
                    <SwiperSlide key={index} className="transition duration-300 self-end cursor-pointer"> 
                        <div className={`relative w-full h-full inset-0 z-50 flex items-center duration-150`}>
                        {width < 600 ?
                            <Link to={`#post-`+index} className="absolute w-full h-full inset-0 opacity-40 bg-black z-10 flex items-center" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}} role="presentation" />
                        :
                            <div to={`#post-`+index} className="absolute w-full h-full inset-0 opacity-40 bg-black z-10 flex items-center" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}} role="presentation" />                        
                        }
                           <div className={`drop-shadow-2xl  rounded relative inset-0 w-[95%] h-[95%] sm:w-[80%] sm:max-w-5xl h-fit-content sm:h-[fit-content] bg-white p-8 m-auto overflow-hidden duration-150 z-30`} >
                                <div className="block sm:flex sm:flex-col cursor-pointer" role="presentation">
                                    <div className="block sm:flex sm:flex-row gap-8">
                                        <div className="w-full sm:w-1/2">
                                            <div className="relative overflow-hidden mb-6">
                                                <div className="rounded absolute w-full h-full  duration-300 opacity-0 group-hover:opacity-30" />
                                                <img className="w-full rounded" src="https://via.placeholder.com/224x224" alt="" />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 flex flex-col">
                                            <div className="flex">
                                                <h4 className='w-3/4 mr-auto group relative !font-inter mb-auto pb-3 sm:pb-8 text-2xl sm:text-3xl font-semibold'>
                                                    {post.title}
                                                    <div className={`bg-[#aaa] absolute bottom-0 left-0 w-10 h-[2px] scale-x-[0.25]  transition transition-gpu duration-200`}/>
                                                </h4>
                                                <div className="flex w-1/4">
                                                    <span className='ml-auto text-2xl sm:text-3xl text-[#aaa]'>
                                                        £{post.price}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className='!font-inter py-2 sm:py-8 text-sm text-[#222]'>
                                                {post.content}
                                            </p> 
                                            <div className="flex gap-4 w-full">
                                                <Button solid={true} target="/pages/contact" text={`Add to cart `+(index+1)} />
                                                <Button target="/pages/contact" text={`Learn more `+(index+1)} />
                                            </div>
                                        </div>
                                    </div> 
                                </div>                         
                            </div>                         
                        </div>
                    </SwiperSlide>
                ))
            }
            <div className={`drop-shadow-2xl  rounded overflow-hidden max-w-5xl m-auto z-30 absolute left-0 right-0 bottom-0 sm:bottom-10 w-[80%] lg:w-full h-2`}>
                <div className="rounded progress z-30" />
            </div>    
        </Swiper>      
    )
};

export default LightBox;