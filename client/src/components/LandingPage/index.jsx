import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

function LandingPage(){
    return(
      <div className='bground'>  
        <div>
            <h1 className='tit'>juegos de pedro</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
      </div>  
    )
}


export default LandingPage;