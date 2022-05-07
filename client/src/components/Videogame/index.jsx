import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { gameDetail } from '../../redux/actions';
import './videogame.css'


export default function Videogame() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const gamesDetail = useSelector((state) => state.detailGame)

    useEffect(() => {
        dispatch(gameDetail(id))
    }, [dispatch, id])
    console.log(gamesDetail)
    
    return(
    
        <div className='card-bg'>
            <div className='button-borders'>
                <Link to='/home' className='primary-button'>Home</Link>
            </div>
            {
                gamesDetail.length !== 0 ? (
                    <div className='cart'>

                        <h1 className='name'>{gamesDetail.map(e=> e.name)}</h1>
                        <img className='igm' src={gamesDetail.map(e=> e.img)} alt = 'img not found'  ></img>
                        <h3 className='desc'>Descripcion: {gamesDetail.map(e=> e.description)} </h3>
                        <h3 className='gend'>Generos: {gamesDetail.map(e=> e.genres).join(', ')} </h3>
                        <h3 className='rat'>Rating: {gamesDetail.map(e=> e.rating)} </h3>
                        <h3 className='rel'>Lanzamiento: {gamesDetail.map(e=> e.released)} </h3>
                        <h3 className='plat'>{gamesDetail.map(e=> e.platforms).join(' , ')} </h3>
                    </div>
                )
                :
                (
                <div>
                    <img src='https://i.gifer.com/1gg6.gif' width='500px' alt='' />
                    <h2>Cargando...</h2>
                </div>
                )   
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