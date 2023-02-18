import React from 'react';
import Page from '../components/Page'
import Dashboard from '../components/blocks/Dashboard';

const Account = () => {  

    return (        
        <div>     
            <Page title="Account" caption="From here you can add and edit your posts" blocks={<Dashboard/>}/>
        </div>           
    )
}

export default Account;