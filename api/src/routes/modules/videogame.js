const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Videogame, Genre } = require('../../db');


router.get('/:id', async(req, res) => {
    
        const { id } = req.params
        if(!id.includes("-")){
            try{
                const apiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                const idList = apiId.data
                
                const resultID ={
                        id: idList.id,
                        name: idList.name,
                        img: idList.background_image,
                        description: idList.description_raw,
                        released: idList.released,
                        rating: idList.rating,
                        genres: idList.genres.map(e => e.name).join('-'),
                        platforms: idList.platforms.map(e => e.platform.name).join('-')
                    }
                   
                
                return res.status(200).json(resultID)
           
            }catch{
                return res.status(404).json('el ID ingresado no corresponde a ningun juego hasta la fecha')
            }
        }else{try {
            const bdInfo = await Videogame.findOne({
            where:{
                 id: id
            },
            include: {
                model: Genre,
                // atribute: ['name']
            }
        })
        const filterBd= {
           
             name: bdInfo.name,
            img: bdInfo.img,
            genres: bdInfo.genres.map(e => e.name).join(', '),
            description: bdInfo.description,
            released: bdInfo.released,
            rating: bdInfo.rating,
            platforms: bdInfo.platforms.join(', ')
            
        }
        
         return res.json(filterBd)
        } catch (error) {
            
        }

        
    }
})

router.post('/', async(req, res) => {
    try{
        let {name, description, platforms, released, rating, img, genres} = req.body
        if(!name || !description || !platforms){
            return res.status(404).json('Falta completar datos obligatorios')
        }
        name = name.charAt(0).toUpperCase()+name.slice(1)
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

router.delete('/:id', async(req, res) => {
    const {id} = req.params;

    const del = await Videogame.destroy({
        where:{
            id: id
        }
    })
    return res.status(200).send('AL LOBBY');
})


module.exports = router;
