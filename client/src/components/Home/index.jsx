import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import Card from '../Card'
import Paginado from "../Paginado";
import NavBar from "../NavBar";
import './home.css'

export default function Home() {

  const dispatch = useDispatch()
  const allGames = useSelector((state) => state.videogames);
  const [actualPage, setActualPage] = useState(1);
  const [gamesViewPage, setGamesViewPage] = useState(15);
  const indexOfLastGame = actualPage * gamesViewPage;
  const indexOfFirstGame = indexOfLastGame - gamesViewPage;
  const actualGame = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNum) => {
    setActualPage(pageNum)
  }

  useEffect(() => {
    dispatch(getAllGames())
  },[dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(getAllGames());
  }
    return (
      <div className="backg"> 
        {/* <h1 className="vt">Juegos V-tec</h1> */}
        <NavBar setActualPage={setActualPage}/>
        <button onClick={e => {handleClick(e)}} className='main_div'>Refrescar</button>
        <div className="pag">
        <Paginado
          gamesViewPage = {gamesViewPage}
          allGames = {allGames.length}
          paginado = {paginado}
        />
        </div>
        {
          actualGame.length > 1 ? (
           actualGame.map(e => (
            <Card 
              name={e.name}
              genres={e.genres.join(' ')}
              img={e.img}
              rating={e.rating}
              id={e.id}
              createdDb={e.createdDb}
              key={e.id}
            />
          ))
          )
          :
          (
            <div className="lds-circle">
                    <h1 className="car">Cargando...</h1>
                    <img src='https://i.gifer.com/1gg6.gif' width='500px' alt='' />
                </div>
          )
        }
      </div>
      ) 
  }


