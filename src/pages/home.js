import React from 'react';
import Page from '../components/Page'
import PostsGrid from '../components/blocks/PostsGrid/Index';

const Home = (props) => {  

    const SeoConfig = {
        title: "Blog",
        description: "This is a sample blog to showcase the MERN Stack and React component state management",
        image: "",
        robots: "",
    }

    return (        
        <div>     
            <Page title="Blog" caption="This is a sample blog to showcase the MERN Stack and React component state management." blocks={<PostsGrid postData={props.posts && props.posts} seo={SeoConfig} />}/>
        </div>           
    )
}

export default Home;