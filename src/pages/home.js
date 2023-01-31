import React from 'react';
import Page from '../components/Page'
import PostsGrid from '../components/blocks/PostsGrid/Index';

const Home = (props) => {  

    return (        
        <div>     
            <Page title="Simple Post Data" caption="Here is some simple post data that we have fetched..." blocks={<PostsGrid postData={props.posts && props.posts}/>}/>
        </div>           
    )
}

export default Home;