import React, { useState, useEffect } from 'react';
import Page from '../components/Page'
import PostsGrid from '../components/blocks/PostsGrid/Index';

const Home = () => {  

    const [posts, setPosts] = useState(undefined);
    useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
        .then(res => res.json())
        .then(data => setPosts(data.products));
    }, []);

    return (        
        <div>     
            <Page title="Simple Post Data" caption="Here is some simple post data that we have fetched from an external API..." blocks={<PostsGrid postData={posts && posts}/>}/>
        </div>           
    )
}

export default Home;