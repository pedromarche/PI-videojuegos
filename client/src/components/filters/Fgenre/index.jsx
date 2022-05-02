import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterGenre, getAllGenres } from "../../../redux/actions";


export default function FilGenre(){
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getAllGenres())
      },[dispatch])
    
    function handlerFilGenre(e){
        e.preventDefault()
        dispatch(filterGenre(e.target.value))
    }
    
    console.log(genres)
      return(
        <div>
        <select onChange={(e) => handlerFilGenre(e)}>
            <option value="all">All</option>
            {
                genres && genres.map(e => (
                    <option key = {e.id} value={e.name} name={e.name}>{e.name}</option>
                    
                ))
            }
        </select>
    </div>
    )
}