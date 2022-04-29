import React from "react";
import { Link } from "react-router-dom";
import './land.css'



export default function Card({name, img, genres, id}){
    return(
        <div>
            <h1><Link to={`/Home/Videogame${id}`}>{name}</Link></h1>
            <img className='im' src={img} alt ='Image Not Found'/>
            <h4>{genres}</h4>
        </div>
    )
}