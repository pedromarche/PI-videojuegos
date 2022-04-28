import { GET_ALL_GAMES } from '../actions/index'

const initialState={
    videogames: [],
    genres: {}
}
    

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES: {
            return{
                ...state,
                videogames: action.payload
            }
        }
        default: return
    }
}


export default rootReducer;