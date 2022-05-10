const {API_KEY} = process.env;
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Genre } = require('../../db');

router.get('/', async(req, res) => {
    const allDb = await Genre.findAll()
        if(allDb.length){ 
            return res.status(200).json(allDb) 
        }
        else{
            try{
                const genApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
                const allGenres = genApi.data.results.map(e => e.name)
                const genres = await allGenres.map(e => {
                  Genre.findOrCreate({
                      where : {
                          name : e
                      }
                  })
                })
                 return res.status(200).json(allGenres);
            }catch(e){
                console.log(e)
            }
        }
  
})



module.exports = router;