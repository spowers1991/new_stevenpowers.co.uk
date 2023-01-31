import React, { } from 'react';
import UnityContext from '../../../UnityContext';

const WebGL = (props) => {  


    
 



  return (
  <div className={``}>
      <div className={`hidden mb-10 text-sm`}>
        <h3>
          <b>
              Camera Controls:
          </b>
        </h3>
        <p>
          New Target: 0-8 (Planets in order from the Sun. The Sun mapped to 0.) <br/>
          Panning & Zooming: W,A,S,D <br/>
          Tilt camera: Q, E  <br/>
          Increase camera speed: SHIFT (Hold)
        </p>
      </div>
   
         <UnityContext/>
      
      <div className={`rounded text-xs relative inline-block lg:mt-0 text-l text-black py-3 mt-5 text-center group cursor-pointer`}  >
            Fullscreen
            <div className={`bg-black absolute bottom-0 left-0 right-0 m-auto w-full h-[2px] scale-x-[0.25] transform group-hover:scale-x-100 transition transition-gpu duration-200`}/>
      </div>               
  
  </div>
  )
}

export default WebGL;
