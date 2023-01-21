import React from 'react';
import Button from '../../utility/Button';

const Post = (props) => {

return (
    <div id={'post-'+props.index} className="group flex flex-col cursor-pointer -mt-2 pt-4" onClick={() => props.HandlePopUp(props.index)} data={props.post?.title} key={props.index} role="presentation">
        <div className="relative overflow-hidden mb-6">
            <div className={`rounded absolute w-full h-full bg-black duration-300 opacity-0 group-hover:opacity-30 ${(props.open && props.index === props.SwiperSyncedKey && 'opacity-30')}`} />
            <img className="w-full rounded" src="https://via.placeholder.com/224x224" alt="" />
        </div>
        <div className="flex">
            <h4 className='w-3/4 mr-auto group relative !font-inter mb-auto pb-4 text-base font-semibold'>
                {props.post.title}
                <div className={`bg-[#aaa] absolute bottom-0 left-0 w-10 h-[2px] scale-x-[0.25] transform group-hover:scale-x-100  ${(props.open && props.index === props.SwiperSyncedKey && 'scale-x-100')} transition transition-gpu duration-200`}/>                      
            </h4>
            <div className="flex w-1/4">
                <span className='ml-auto text-[#aaa]'>
                    £{props.post.price}
                </span>
            </div>
        </div>
        <p className='!font-inter mb-auto mt-4 pb-4 text-sm text-[#222]'>
            {props.post.description}
        </p>
        <Button className="mt-auto" solid={true} active={props.open && props.index === props.SwiperSyncedKey ? true : false} target="/pages/contact" text={`Button `+(props.index+1)}/>
    </div>
    )
}

export default Post;