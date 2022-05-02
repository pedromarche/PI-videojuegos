import React from "react";

export default function Paginado({gamesViewPage, allGames, paginado}){
    const pageNum = [];

    for(let i = 0; i< Math.ceil(allGames/gamesViewPage); i++){
        pageNum.push(i+1);
    }

    return(
        <nav>
            <ul className="paginado">
                { 
                    pageNum && pageNum.map(n => (
                        <li className="n" key={n}>
                            <button onClick={() => paginado(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}