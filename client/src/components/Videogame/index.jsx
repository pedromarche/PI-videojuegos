import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { gameDetail } from '../../redux/actions';


export default function Videogame() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const gamesDetail = useSelector((state) => state.detailGame)

    useEffect(() => {
        dispatch(gameDetail(id))
    }, [dispatch, id])
    console.log(gamesDetail)
    
    return(
    
        <div>
            {
                gamesDetail ?
                    <div>

                        <h1>{gamesDetail.map(e=> e.name)}</h1>
                        <img src={gamesDetail.map(e=> e.img)} alt = 'img not found'></img>
                        <h3>descripcion: {gamesDetail.map(e=> e.description)} </h3>
                        <h3>generos:{gamesDetail.map(e=> e.genres)} </h3>
                        <h3>rating:{gamesDetail.map(e=> e.rating)} </h3>
                        <h3>plataformas:{gamesDetail.map(e=> e.platforms)} </h3>
                        <h3>fecha de lanzamiento:{gamesDetail.map(e=> e.released)} </h3>
                    </div>
                :
                <h1>Cargando....</h1>
            }   
        </div>
    )
  }
//   name, description, platforms, released, rating, background_image, genres

// id: e.id,
// name: e.name,
// img: e.background_image,
// description: e.description,
// released: e.released,
// rating: e.rating,
// genres: e.genres.map(e => e.name),
// platforms: e.platforms.map(e => e.platform.name)