import axios from 'axios';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const CREAT_GAME = 'CREAT_GAME';
export const GAME_DETAIL = 'GAME_DETAIL';
export const GET_NAME = 'GET_NAME';


export function getAllGames(){ // trae todos los juegos
    return async function(dispatch){
        var json = await axios("http://localhost:3001/videogames");
        return dispatch({type: GET_ALL_GAMES, payload: json.data});  
    }
};

export const getName = (name) => dispatch => { // busca por name
    return fetch (`http://localhost:3001/videogames?name=${name}`)
    .then(response => response.json())
    .then(data => dispatch({type: GET_NAME, payload: data}));
}

// export function getAllGenres(){ //trae todos los generos
//     return async function(dispatch){
//         var json = await axios("http://localhost:3001/genres");
//         return dispatch({type: GET_ALL_GENRES, payload: json.data});
//     }
// }

export function gameDetail(id){ //trae por id por params
    return async function(dispatch){
    var json = await axios(`http://localhost:3001/videogame/${id}`);
    return dispatch({type: GAME_DETAIL, payload: json.data})
    }
}; 
        
    

// export function createGame(){ //crear juego
//     return async function(dispatch){
//         var json = await axios ("http://localhost:3001/videogame")
//         return dispatch({type: CREAT_GAME, payload: json.data})
//     }
// }

