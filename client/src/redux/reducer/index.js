import { GET_ALL_GAMES, GET_ALL_GENRES, CREAT_GAME, GAME_DETAIL, GET_NAME, FILTER_RATING, FILTER_NAME, FILTER_GENRE } from '../actions/index'

const initialState={
    videogames: [],
    genres: [],
    platforms: [],
    detailGame:[]
}
    

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_GAMES: {
            return{
                ...state,
                videogames: payload,
                nfilt: payload
            }
        }
        case GET_ALL_GENRES: {
            return{
                ...state,
                genres: payload          
            }
        }
        case CREAT_GAME: {
            return{
                ...state,
                videogames: payload
            }
        }
        case GAME_DETAIL: {
            return{
                ...state,
                detailGame: payload
            }
        }
        case GET_NAME:{
            return{
                ...state,
                videogames: payload
            }
        }
        case FILTER_RATING: {
            const rfilt = payload === 'best' ? 
            [...state.videogames].sort((a, b) => b.rating - a.rating)
            :
            [...state.videogames].sort((a,b) => a.rating - b.rating)
                return{
                    ...state,
                    videogames: rfilt
                
                }
        }
        case FILTER_NAME:
            const nfilt = payload === 'asc' ?
                [...state.videogames].sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) 
                :
                [...state.videogames].sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: nfilt
            }
            case FILTER_GENRE:{
                const fGenre = state.nfilt
                const genreF = payload === 'all' ? fGenre : fGenre.filter(p => p.genres.includes(payload))
                return{
                    ...state,
                    videogames: genreF
                }
            }
        default: return state
    }
    
}




export default rootReducer;

