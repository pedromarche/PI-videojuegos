import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

function LandingPage(){
    return(
      <div className='bground'>  
        <div className='divbut'>          
          <Link to = '/home'>
            <button className='butt'>Ingresar</button>
          </Link>
        </div>
        <div className='text'>
          <h1 className='ttt'>Bienvenidos al proyecto de videojuegos</h1>
        </div>
        <div className='h3'>
          <h4 className='pam'>Por Pedro Marchetto</h4>
        </div>
      </div>  
    )
}


export default LandingPage;