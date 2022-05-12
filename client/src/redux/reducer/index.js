import { CLEAR_PAGE, GET_ALL_GAMES, GET_ALL_GENRES, CREAT_GAME, GAME_DETAIL, GET_NAME, FILTER_RATING, FILTER_NAME, FILTER_GENRE, FILTER_ORIGIN } from '../actions/index'

const initialState={
    videogames: [],
    genres: [],
    platforms: [],
    detailGame:[]
}
    

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_GAMES: 
            return{
                ...state,
                videogames: payload,
                nfilt: payload
            
        }
        case GET_ALL_GENRES: 
            return{
                ...state,
                genres: payload          
            
        }
        case CREAT_GAME: 
            return{
                ...state,
            }
        
        case GAME_DETAIL: 
            return{
                ...state,
                detailGame: payload
            }
        
        case GET_NAME:
            return{
                ...state,
                videogames: payload
            }
        
        case FILTER_RATING: {
            const fil = state.nfilt;
            const rfilt = payload === 'best' ? 
            [...state.videogames].sort((a, b) => b.rating - a.rating)
            :
            [...state.videogames].sort((a,b) => a.rating - b.rating)
                return{
                    ...state,
                    videogames: payload === 'all' ? fil : rfilt
                
                }
        }
        case FILTER_NAME:
            const fil = state.nfilt;
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
                videogames: payload === 'all' ? fil : nfilt
            }
            case FILTER_GENRE:{
                const fGenre = state.nfilt
                const genreF = payload === 'all' ? fGenre : fGenre.filter(p => p.genres.includes(payload))
                if(genreF.length === 0){
                    alert('no se encontro un juego con ese genero')
                }else{
                 return{
                    ...state,
                    videogames: genreF
                }   
                }
                
            }
            case FILTER_ORIGIN:{
                const fOrigin = state.nfilt;
                const fApi = fOrigin.filter(o => o.origin === 'API');
                const fDB = fOrigin.filter(o => o.origin === 'DB');
                if(payload === 'DB'){
                    if(fDB.length !== 0){
                        return {
                            ...state,
                            videogames: fDB
                        }
                    }
                    alert('no hay juego en la base de datos')
                }else if(payload === 'API'){
                    if(fApi.length !== 0){
                        return {
                            ...state,
                            videogames: fApi
                        }
                    }
                    alert('no se encontro el juego')
                }else{
                    return{
                        ...state,
                        videogames: fOrigin
                    }
                }
            }
            case CLEAR_PAGE:
                return{
                    ...state,
                    detailGame: []
                }
        default: return state
    }
    
}




export default rootReducer;
