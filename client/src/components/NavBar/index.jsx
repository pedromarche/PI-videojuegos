import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Frating from "../filters/Frating";
import Fgenre from "../filters/Fgenre";
import Fdbapi from "../filters/Fdbapi";
import './Nav.css'
import CreateGame from "../CreateGame";
function NavBar(){
   
   
   
   
   
    return(
    <div>
       <ul>
            
             <li className=".barra">
                {/* <Link to='/home'>V-tec</Link> */}
            </li>
            <li>    
                <Link to='/home/createGame'>ingresa un juego</Link>
            </li>
            <SearchBar/>
            <Frating/>
            <Fgenre/>
            <Fdbapi/>

        </ul>
    </div>    
) 
}


export default NavBar;