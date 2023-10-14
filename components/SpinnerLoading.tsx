import React from 'react'; 
import Loader from "react-loader-spinner"; 
import {Audio} from "react-loader-spinner"; 
  
export default function SpinnerLoading(){ 
  return ( 
    <div className='container' style={{position: 'fixed', top: '40vh', left: '40vw'}}> 
           
      <Audio 
        type="Puff"
        color="orange"
        height={100} 
        width={100} 
        timeout={3000}  
      /> 
    </div> 
  ) 
} 