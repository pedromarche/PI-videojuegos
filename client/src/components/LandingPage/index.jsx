import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

function LandingPage(){
    return(
        <div className='ds'>
            <h1>Zar Videogames</h1>
            <Link to = '/Home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}


export default LandingPage;