import React from "react";
import { Link } from "react-router-dom";

function SearchBar() {
    return (
    <div>
       <input type='text'  placeholder='la barra buscadora'/>
       <button type='submit' >buscar</button>
    </div>
    
    );
  }


export default SearchBar;