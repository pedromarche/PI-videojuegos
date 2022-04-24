const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
// const Videogame = require('../../models/Videogame');
const router = Router();
const {Videogame, Genre } = require('../../db');

const getFromApi = async() => { //traigo los juegos de la api
    const gameList = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const props = await gameList.data.results.map(e => {
        return {
           name : e.name,
           background_image : e.background_image,
           genres : e.genres.map(e => e.name),
        }
    });
    return props;
}

const getFromDb = async() => {
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

const allVideogames = async() => {
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
        const {name, description, platforms, released, rating, image, genres} = req.body
        if(!name || !description || !platforms){
            return res.status(404).json('Falta completar datos obligatorios')
        }
        const haveGame = await Videogame.create({name, description, platforms, released, rating, image});
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