import React from 'react';
import ContentBox from '../components/ContentBox'
import Form from '../components/Form'

const Test = () => { 
    return (        
        <div>
            <ContentBox title="Contact" content="Fill out the form..." form={<Form/>}/>
        </div>           
    )
}

export default Test;