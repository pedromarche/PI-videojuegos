import { GET_ALL_GAMES, GET_ALL_GENRES, CREAT_GAME, GAME_DETAIL, GET_NAME } from '../actions/index'

const initialState={
    videogames: [],
    gameDetail: [],
    genres: [],
    platforms: []
}
    

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_GAMES: {
            return{
                ...state,
                videogames: payload
            }
        }
        // case GET_ALL_GENRES: {
        //     return{
        //         ...state,
        //         genre: payload          
        //     }
        // }
        // case CREAT_GAME: {
        //     return{
        //         ...state,
        //         videogames: payload
        //     }
        // }
        // case GAME_DETAIL: {
        //     return{
        //         ...state,
        //         gameDetail: payload
        //     }
        // }
        // case GET_NAME:{
        //     return{
        //         ...state,
        //         videogames: payload
        //     }
        // }
        default: return state
    }
}




export default rootReducer;