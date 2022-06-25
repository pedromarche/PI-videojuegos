import React from "react";
import { Link } from "react-router-dom";
import './card.css'



export default function Card({name, img, genres, id, realesed, platforms, rating}){
    return(
        <div className="bg">
            <img className='im' src={img} alt ='Not Found'/>
            <h1 className="tit"><Link to={`/home/videogame/${id}`}>{name}</Link></h1>
            <h4 className="gen">{genres}</h4>
            {/* <h4>{platforms}</h4> */}
            <h4 className="rata">{rating}</h4>
        </div>
    )
}