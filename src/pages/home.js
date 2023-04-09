import React from 'react';
import Page from '../components/Page'
import PostsGrid from '../components/blocks/PostsGrid/Index';

const Home = (props) => {  

    return (        
        <div>     
            <Page title="Blog" caption="Here is a collection of blog posts..." blocks={<PostsGrid postData={props.posts && props.posts}/>}/>
        </div>           
    )
}

export default Home;