import React, { useState, useEffect, useRef } from 'react';
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


    const swiperRefs = useRef([]);
      
    const addSwiperRef = (swiper) => {
        if (swiper && !swiper.destroyed) {
            swiperRefs.current.push(swiper);
        }
        swiperRefs.current = swiperRefs.current.filter(swiper => swiper.destroyed !== true);
    };

    const swiperGalleryRefs = useRef([]);
      
    const addSwiperGalleryRef = (swiper) => {
        if (swiper && !swiper.destroyed) {
            swiperGalleryRefs.current.push(swiper);
        }
        swiperGalleryRefs.current = swiperGalleryRefs.current.filter(swiper => swiper.destroyed !== true);
    };

    const swiperThumbRefs = useRef([]);
      
    const addSwiperThumbsRef = (swiper) => {
        if (swiper && !swiper.destroyed) {
            swiperThumbRefs.current.push(swiper);
        }
        swiperThumbRefs.current = swiperThumbRefs.current.filter(swiper => swiper.destroyed !== true);
    };

    const [activeThumb, setActiveThumb] = useState(0);

    function setThumbActive(object) {
        const activeIndex = object.activeIndex;
        setActiveThumb(activeIndex)
    }

    return (
        active &&    
        <Swiper className={`!fixed !w-full !h-full !inset-0 !z-50 transition transform duration-300 top-0 ${animate ? 'pointer-events-all opacity-100' : 'pointer-events-none opacity-0'}`}
            onSwiper={addSwiperRef}
            pagination={{
                el: '.progress',
                type: "progressbar",
            }}    
            spaceBetween={0}
            slidesPerView={1}
            keyboard={{ enabled: true }}
            mousewheel={true}
            //navigation={true}
            resistanceRatio={0}
            direction={"vertical"}
            modules={[Pagination, Navigation, Keyboard, Mousewheel]}
            initialSlide={props.keyValue}
            onSlideChange={(e) => {props.SwiperSyncedKeyCallback(e.realIndex);setThumbActive(swiperGalleryRefs.current[e.realIndex])}}
            >  
            <button className="drop-shadow-2xl  group absolute bg-black text-white rounded-xl py-3 px-5 top-[unset] sm:top-5 bottom-20 sm:bottom-[unset] right-5 text-3xl z-20 hover:bg-white hover:text-black duration-500" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}}>
                X
                <div className='bg-white group-hover:bg-black absolute bottom-3 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-[60%] transition transition-gpu duration-200'>

                </div>
            </button>
            {posts && posts.map((post, key, index) => (
                    <SwiperSlide key={key} className="transition duration-300 self-end cursor-pointer"> 
                        <div className={`relative w-full h-full inset-0 z-50 flex items-center duration-150`}>
                        {width < 600 ?
                            <Link to={`#post-`+index} className="absolute w-full h-full inset-0 opacity-40 bg-black z-10 flex items-center" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}} role="presentation" />
                        :
                            <div to={`#post-`+index} className="absolute w-full h-full inset-0 opacity-40 bg-black z-10 flex items-center" onClick={() => {resetLightBox();props.HandlePopUp(props.keyValue)}} role="presentation" />                        
                        }
                           <div className={`drop-shadow-2xl rounded relative inset-0 w-[95%] h-[85%] sm:max-w-[600px] h-fit-content sm:h-[fit-content] bg-white p-8 m-auto overflow-hidden duration-150 z-30`} >
                                <div className="block sm:flex sm:flex-col cursor-pointer" role="presentation">
                                    <div className="m-auto max-w-full block sm:flex sm:flex-col gap-2 xl:gap-8">
                                        <div className="w-full">
                                            <div className="relative overflow-hidden mb-6">
                                                <div className="rounded absolute w-full h-full  duration-300 opacity-0 group-hover:opacity-30" />
                                                <Swiper className={`relative w-full h-full`}
                                                        onSwiper={addSwiperGalleryRef}
                                                        pagination={{
                                                            type: "fraction",
                                                        }}   
                                                        spaceBetween={0}
                                                        slidesPerView={1}
                                                        keyboard={{ enabled: true }}
                                                        navigation={true}
                                                        resistanceRatio={0}
                                                        modules={[Pagination, Navigation, Keyboard]}
                                                        onSlideChange={(e) => {swiperThumbRefs.current[key].slideTo(e.realIndex); setThumbActive(swiperGalleryRefs.current[key])}}
                                                        >                                                   
                                                        {post?.images && post?.images.map((image, index) => (
                                                            <SwiperSlide key={index} className="transition duration-300 self-end cursor-pointer">    
                                                                <img className="object-cover w-full h-full rounded" src={`${process.env.REACT_APP_BASEURL+image}`} alt="" />
                                                            </SwiperSlide>
                                                        ))}                                           
                                                    </Swiper>
                                                    <Swiper 
                                                    onSwiper={addSwiperThumbsRef}
                                                    className={`relative flex gap-2 w-full h-full mt-3 mx-auto`}
                                                    pagination={{
                                                        type: "fraction",
                                                    }}   
                                                    spaceBetween={10}
                                                    slidesPerView={3}
                                                    resistanceRatio={0}
                                                    onSlideChange={(e) => {swiperGalleryRefs.current[key].slideTo(e.realIndex);}}
                                                    >
                                                    {post?.images && post?.images.map((image, index) => (
                                                        <SwiperSlide key={index} className="transition duration-300 self-end cursor-pointer" onClick={() => {swiperGalleryRefs.current[key].slideTo(index); swiperThumbRefs.current[key].slideTo(index);}}>    
                                                            <img className={`${activeThumb === index ? 'border-2 border-black' : ''} object-cover rounded max-h-[50px] xl:max-h-[100px] w-full`} src={`${process.env.REACT_APP_BASEURL+image}`} alt="" />                                                        
                                                        </SwiperSlide>
                                                    ))} 
                                                </Swiper>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col lg:hidden xl:flex">
                                            <div className="flex">
                                                <h4 className='w-3/4 mr-auto group relative !font-inter mb-auto pb-3 xl:pb-8 text-2xl sm:text-3xl font-semibold'>
                                                    {post.title}
                                                    <div className={`bg-[#aaa] absolute bottom-0 left-0 w-10 h-[2px] scale-x-[0.25]  transition transition-gpu duration-200`}/>
                                                </h4>
                                                <div className="flex w-1/4">
                                                    <span className='ml-auto text-xs sm:text-base text-[#aaa]'>
                                                        {post.images.length} Photos
                                                    </span>
                                                </div>
                                            </div>
                                            <p className='!font-inter pt-3 pb-6 xl:py-8 text-sm text-[#222]'>
                                                {post.content}
                                            </p> 
                                            <div className="flex gap-4 w-full">
                                                <Button solid={true} target="/pages/contact" text={`View `+(key+1)+` gallery`} />
                                                <Button target="/pages/contact" text={`Share `} />
                                            </div>
                                        </div>
                                    </div> 
                                </div>                         
                            </div>                         
                        </div>
                    </SwiperSlide>
                ))
            }
            <div className="rounded progress z-30 !left-[unset] !right-0 w-2" />
        </Swiper>      
    )
};

export default LightBox;