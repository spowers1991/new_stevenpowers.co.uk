import React from 'react';
import Page from '../components/Page'
import Dashboard from '../components/blocks/Dashboard';

const Account = () => {  

    return (        
        <div>     
            <Page title="Account" caption="Account page blah" blocks={<Dashboard/>}/>
        </div>           
    )
}

export default Account;