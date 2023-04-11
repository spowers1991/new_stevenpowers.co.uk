import React from 'react';
import Page from '../components/Page'
import Form from '../components/blocks/Form/Index'

const Contact = () => { 

    const SeoConfig = {
        title: "Contact",
        description: "You can contact me using the this form",
        image: "",
        robots: "",
    }

    return (              
        <div>
            <Page title="Contact" caption="Fill out the form..." blocks={<Form/>} seo={SeoConfig}/>
        </div>           
    )
}

export default Contact;