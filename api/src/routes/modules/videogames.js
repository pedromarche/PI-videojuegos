const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
// const Videogame = require('../../models/Videogame');
const router = Router();
const {Videogame, Genre } = require('../../db');

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
                        name : e.name,
                        background_image : e.background_image,
                         genres : e.genres.map(e => e.name),
                         }
                    });
    
    return props;
    
}

const getFromDb = async() => { //traigo juegos de la bd
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through:{                
                attributes: []
            }
        }
    })
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
            const gameName = await videogameList.filter(e => e.name.toLowerCase().include(name.toLowerCase()))
            if(gameName.length >= 0){
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


router.post('/', async(req, res) => {
    try{
        const {name, description, platforms, released, rating, background_image, genres} = req.body
        if(!name || !description || !platforms){
            return res.status(404).json('Falta completar datos obligatorios')
        }
        const haveGame = await Videogame.create({name, description, platforms, released, rating, background_image});
        const haveGenre = await Genre.findAll({
            where: { name: genres }
        })
        haveGame.addGenre(haveGenre);
        res.status(201).json('el videojuego se a creado correctamente')
    }catch(e){
        console.log(e);
    }

})


module.exports = router;