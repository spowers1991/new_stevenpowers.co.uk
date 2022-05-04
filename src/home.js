import React from 'react';
import ContentBox from './components/ContentBox'
import Slider from './components/Slider'

const Home = () => {  
    return (        
        <div>         
            <ContentBox title="Projects" content="Nothing to see here..." slider={<Slider />}/>
        </div>           
    )
}

export default Home;