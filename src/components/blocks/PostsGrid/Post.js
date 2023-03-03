import React from 'react';

const Post = (props) => {

return (
    <div id={'post-'+props.index} className={`duration-200 rounded border-2 border-dashed hover:border-solid group flex flex-col cursor-pointer p-4 ${(props.open && props.index === props.SwiperSyncedKey && '!border-solid ')}`} onClick={() => props.HandlePopUp(props.index)} data={props.post?.title} key={props.index} role="presentation">
        <div className="relative overflow-hidden mb-6">
            <div className={`rounded absolute w-full h-full bg-black duration-300 opacity-0 group-hover:opacity-30 ${(props.open && props.index === props.SwiperSyncedKey && 'opacity-30')}`} />
            <img className="w-full rounded" src={`${process.env.REACT_APP_BASEURL}/${props.post.featuredImage}`} alt="" />
        </div>
        <div className="flex items-center">
            <h4 className='w-1/2 mr-auto group relative !font-inter mb-auto pb-4 text-base font-semibold'>
                {props.post.title}
                <div className={`bg-[#aaa] absolute bottom-0 left-0 w-10 h-[2px] scale-x-[0.25] transform group-hover:scale-x-100  ${(props.open && props.index === props.SwiperSyncedKey && 'scale-x-100')} transition transition-gpu duration-200`}/>                      
            </h4>
            <div className="flex w-1/2 self-end">
                <span className='text-xs ml-auto text-[#aaa]'>
                    10 mins
                </span>
            </div>
        </div>
        <p className='!font-inter mb-auto mt-4 pb-4 text-sm text-[#222]'>

        </p>
      </div>
    )
}

export default Post;