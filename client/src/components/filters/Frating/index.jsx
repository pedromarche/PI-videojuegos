import React from "react";
import { useDispatch } from "react-redux";
import { filterName, filterRatio } from "../../../redux/actions";

export default function FilRating({setActualPage}){
    const dispatch = useDispatch();

    function handlerFilRating(e){
        setActualPage(1)
        e.preventDefault()
        if(e.target.value === 'best' || e.target.value === 'worst'){
            dispatch(filterRatio(e.target.value))
        }else{
            dispatch(filterName(e.target.value))
        }
    }

    return (
        <div>
            <div className="misma">
                <select className="dd" onChange={(e) => handlerFilRating(e)}>
                    <option value='all'>All</option>
                    <option value="best">mayor Rating</option>
                    <option value="worst">menor Rating</option>
                </select>
            </div>
            <div className="misma"> 
                <select className="dd" onChange={(e) => handlerFilRating(e)}>
                    <option value='all'>All</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>    
        </div>
        
    )
}