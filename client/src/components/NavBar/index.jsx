import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Frating from "../filters/Frating";
import Fgenre from "../filters/Fgenre";
import Fdbapi from "../filters/Fdbapi";
import './nav.css'



export default function NavBar({setActualPage}){
    
return(
  
       <div className='nav-links'>
            <div className="lint">    
                <Link to='/home/createGame'>
                  <button className="batt">Crea tu juego</button>
                  </Link>
            </div>
            
            <div className="filt">
              <div className="rr"><Frating setActualPage={setActualPage}/></div>
              <div className="rr"><Fgenre setActualPage={setActualPage}/></div>
              <div className="rr"><Fdbapi setActualPage={setActualPage}/></div>
            </div>
              <div className="serch">
                <SearchBar setActualPage={setActualPage} className='sach'/>
              </div>
        </div>      
   
) 
}
