import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Frating from "../filters/Frating";
import Fgenre from "../filters/Fgenre";
import Fdbapi from "../filters/Fdbapi";
import './nav.css'
// import CreateGame from "../CreateGame";


export default function NavBar(){
    
return(
  <nav>
    <div className='top'>
       <ul className='nav-links'>
            
             <li>
                {/* <Link to='/home'>V-tec</Link> */}
            </li>
            <li>    
                <Link to='/home/createGame'>ingresa un juego</Link>
            </li>
            <li>
            <SearchBar/>
            <Frating/>
            <Fgenre/>
            <Fdbapi/>
            </li>
        </ul>
    </div>    
  </nav> 
) 
}
