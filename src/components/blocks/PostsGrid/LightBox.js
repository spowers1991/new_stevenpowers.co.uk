import React, { useState, useEffect } from 'react';
import Button from '../../utility/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard, Mousewheel } from "swiper";

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
            {posts && posts.map((post, index) => (
                    <SwiperSlide key={index} className="transition duration-300 self-end cursor-pointer"> 
                        <div className={`relative w-full h-full inset-0 z-50 flex items-center duration-150`}>
                            <div className="absolute w-full h-full inset-0 opacity-40 bg-black z-10 flex items-center" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}} role="presentation" />
                            <div className={`rounded relative inset-0 w-[90%] sm:max-w-5xl h-fit-content sm:h-[fit-content] bg-white p-8 m-auto overflow-hidden duration-150 z-30`} >
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
                                                <h4 className='w-3/4 mr-auto group relative !font-inter mb-auto pb-8 text-2xl sm:text-3xl font-semibold'>
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
                                                {post.description}
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
            <div className={`rounded overflow-hidden max-w-5xl m-auto z-30 absolute left-0 right-0 bottom-0 sm:bottom-10 w-[90%] lg:w-full h-2`}>
                <div className="rounded progress z-30" />
            </div>    
        </Swiper>      
    )
};

export default LightBox;