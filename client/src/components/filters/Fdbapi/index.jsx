import React from "react";
import { useDispatch } from "react-redux";
import { filtOrigin } from "../../../redux/actions";



export default function OriginFilt({setActualPage}){
    const dispatch = useDispatch();


    function handlerFilOrigin(e){
        setActualPage(1)
        e.preventDefault()
        dispatch(filtOrigin(e.target.value))        
    }

    return(
        <div>
            <select className="dd" onChange={(e) => handlerFilOrigin(e)}>
                <option value = 'All'>All</option>
                <option value = 'API'>Api</option>
                <option value = 'DB'>Data Base</option>
            </select>
        </div>
    )
}