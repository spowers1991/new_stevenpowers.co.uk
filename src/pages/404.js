import React from 'react';
import Page from '../components/Page'
import NotFoundBlock from '../components/blocks/404';

const NotFound = () => {
    
    const SeoConfig = {
                    title: "404",
                    description: "The page you where looking for does not exist.",
                    image: "",
                    robots: "noindex, nofollow",
                }

    return (        
        <div>     
            <Page title="404" caption="The page you where looking for does not exist." blocks={<NotFoundBlock/>} seo={SeoConfig}/> 
        </div>           
    )
}

export default NotFound;