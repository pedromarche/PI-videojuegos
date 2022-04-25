const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Videogame, Genre } = require('../../db');


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