import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filtOrigin } from "../../../redux/actions";



export default function OriginFilt(){
    const dispatch = useDispatch();


    function handlerFilOrigin(e){
        e.preventDefault()
        if(e.target.value === 'API' || e.target.value === 'DB'){
            dispatch(filtOrigin(e.target.value))
        }
    }

    return(
        <div>
            <select onChange={(e) => handlerFilOrigin(e)}>
                <option value = 'All'>All</option>
                <option value = 'API'>Api</option>
                <option value = 'DB'>Data Base</option>
            </select>
        </div>
    )
}