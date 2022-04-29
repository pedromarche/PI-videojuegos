import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import Card from '../Card'
import Paginado from "../Paginado";
import NavBar from "../NavBar";

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
      <div> 
        <NavBar/>
        <h1>juegos juegos juegos</h1>
        <button onClick={e => {handleClick(e)}}>Refresh</button>
        <Paginado
          gamesViewPage = {gamesViewPage}
          allGames = {allGames.length}
          paginado = {paginado}
        />
        {
          actualGame && actualGame.map(e => (
            <Card 
              name={e.name}
              genres={e.genres.join(' ')}
              img={e.background_image}
              rating={e.rating}
              id={e.id}
              createdDb={e.createdDb}
              key={e.id}
            />
          ))
        }
      </div>
      ) 
  }


