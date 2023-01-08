import React from 'react';
import Page from '../components/Page'
import Form from '../components/blocks/Form/Index'

const Contact = () => { 
    return (        
        <div>
            <Page title="Contact" caption="Fill out the form..." blocks={<Form/>}/>
        </div>           
    )
}

export default Contact;