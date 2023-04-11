import React from 'react';
import Page from '../components/Page'
import Dashboard from '../components/blocks/Dashboard';

const Account = () => {
    
    const SeoConfig = {
                    title: "My account",
                    description: "A user account dashboard for adding content to my blog. Upon approval, you can add and edit posts which become visible on the frontend. It was created using the MERN stack",
                    image: "",
                    robots: "",
                }

    return (        
        <div>     
            <Page title="Account" caption="Add and edit your posts" blocks={<Dashboard/>} seo={SeoConfig}/> 
        </div>           
    )
}

export default Account;