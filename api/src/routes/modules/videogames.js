const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Videogame, Genre } = require('../../db');
const e = require('express');

const getFromApi = async() => { //traigo los 100 juegos de la api
    const gameList1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const gameList2 = await axios.get(gameList1.data.next);
    const gameList3 = await axios.get(gameList2.data.next);
    const gameList4 = await axios.get(gameList3.data.next);
    const gameList5 = await axios.get(gameList4.data.next);
    const gameList = gameList1.data.results
                    .concat(gameList2.data.results)
                    .concat(gameList3.data.results)
                    .concat(gameList4.data.results)
                    .concat(gameList5.data.results) 
    
    const props = gameList.map(e => {
                    return {
                        id: e.id,
                        name : e.name,
                        img : e.background_image,
                        released: e.released,
                        rating: e.rating,
                        platforms : e.platforms.map(e => e.platform.name),
                         genres : e.genres.map(e => e.name),
                         origin: 'API'
                         }
                    });
    
    return props;
    
}

// module.exports = 
async function getFromDb() { //traigo juegos de la bd
        let gen = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through:{                
                    attributes: []
                }
            }
        }) 
        //mapeo genres para sacarlo del objeto
        
        gen = gen.map(({
            id,
            name , 
            img,
            released, 
            rating,
            platforms, 
            Genres,    
           }) =>({
        
            id,
            name , 
            img,
            released, 
            rating,
            platforms, 
            genres: Genres.map(e => e.name),
            origin: 'DB'   
           })

           
           )
           return gen;
    }

const allVideogames = async() => { // armo una lista con todos los videojuegos
    const api = await getFromApi();
    const db = await getFromDb();
    const allApiDb = api.concat(db);
    return allApiDb;
}


router.get('/', async(req, res) => {
    try{
        const  name  = req.query.name
        const videogameList = await allVideogames();
        if(name){
            const gameName = await videogameList.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).slice(0,15)
            if(gameName.length > 0){
                return res.status(200).json(gameName);
            }else{
                return res.status(404).json('el videojuego no existe')
            }
        }else{
            res.status(200).json(videogameList);
        }
    }catch(e){
        console.log(e)
    }
})


module.exports = router;