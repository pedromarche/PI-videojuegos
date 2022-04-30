import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import './Nav.css'
function NavBar(){
   return(
    <div>
       <ul>
            <SearchBar/>
             <li className=".barra">
                <Link to='/home'>Zar</Link>
            </li>
            <li>    
                <Link to='/home/creatGame'>ingresa un juego</Link>
            </li>
        </ul>
    </div>    
) 
}


export default NavBar;