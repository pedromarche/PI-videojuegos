import React from "react";
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
  const gamesViewPage = 15;
  const indexOfLastGame = actualPage * gamesViewPage;
  const indexOfFirstGame = indexOfLastGame - gamesViewPage;
  let actualGame = allGames.slice(indexOfFirstGame, indexOfLastGame);
  
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
          actualGame.length > 0 && typeof actualGame[0] !== 'string'  ? (
          
           actualGame.map(e => (
            <Card 
              name={e.name}
              genres={e.genres}
              img={e.img}
              rating={e.rating}
              id={e.id}
              platforms={e.platforms}
              createdDb={e.createdDb}
              key={e.id}
            />
          ))
          )
           : 
            typeof actualGame[0] === 'string' ? (
              <div>
                <h1 className="error">El videojuego no existe</h1> 
              </div>
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