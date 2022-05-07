import React from "react";
import './paginado.css'


export default function Paginado({gamesViewPage, allGames, paginado}){
    const pageNum = [];

    for(let i = 0; i< Math.ceil(allGames/gamesViewPage); i++){
        pageNum.push(i+1);
    }

    return(
        <nav>
            <ul>
                { 
                    pageNum && pageNum.map(n => (
                        <li className="nan" key={n}>
                            <button className='pgbut' onClick={() => paginado(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}