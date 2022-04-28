import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'
function NavBar(){
   return(

       <ul className=".barra">

        <li>
            <Link to='/home'>Zar</Link>
            <Link to='/home/CreatGame'>ingresa un juego</Link>
        </li>
    </ul>
) 
}


export default NavBar;