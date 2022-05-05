import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

function LandingPage(){
    return(
      <div className='bground'>  
        <div>
            <h1 className='tit'>V-tec games</h1>
            <Link to = '/home'>
                <button className='butt'>Ingresar</button>
            </Link>
        </div>
      </div>  
    )
}


export default LandingPage;