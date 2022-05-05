const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Videogame, Genre } = require('../../db');
// const { getFromDb } = require('./videogames');

async function getFromDb() { //traigo juegos de la bd
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

router.get('/:id', async(req, res) => {
    
        const { id } = req.params
        if(!id.includes("-")){
            try{
                const idList = [];
                const apiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                
                idList.push(apiId.data)
                // console.log(idList)
                const resultID = idList.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        img: e.background_image,
                        description: e.description_raw,
                        released: e.released,
                        rating: e.rating,
                        genres: e.genres.map(e => e.name),
                        platforms: e.platforms.map(e => e.platform.name)
                    }
                   
                }) 
                return res.status(200).json(resultID)
           
            }catch{
                return res.status(404).json('el ID ingresado no corresponde a ningun juego hasta la fecha')
            }
        
        }else{try{

                const idDb = await getFromDb();
                const filtId = idDb.filter(e => e.id === id)
                if(filtId.length > 0){
                    return res.status(200).json(filtId);
                }else{
                    return res.status(400).json('el ID ingresado no corresponde a ningun juego hasta la fecha')
                }
            }catch(e){
                console.log(e)
            }
            
            // const gameById = resultID.filter(e => e.id === id)
            //  console.log(gameById)
            // if(resultID.includes(id)){
                //  console.log(resultID)
            //     // console.log('SAPEEEEE')
        
            }
})

router.post('/', async(req, res) => {
    try{
        const {name, description, platforms, released, rating, img, genres} = req.body
        if(!name || !description || !platforms){
            return res.status(404).json('Falta completar datos obligatorios')
        }
        const haveGame = await Videogame.create({name, description, platforms, released, rating, img});
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