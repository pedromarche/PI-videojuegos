import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Frating from "../filters/Frating"
import FilGenre from "../filters/Fgenre";
import './Nav.css'
function NavBar(){
   
   
   
   
   
    return(
    <div>
       <ul>
            
             <li className=".barra">
                <Link to='/home'>Zar</Link>
            </li>
            <li>    
                <Link to='/home/creatGame'>ingresa un juego</Link>
            </li>
            <SearchBar/>
            <Frating/>
            <FilGenre/>

        </ul>
    </div>    
) 
}


export default NavBar;