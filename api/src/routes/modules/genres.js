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
                const genre = await allGenres.map(e => {
                  Genre.findOrCreate({
                      where : {
                          name : e
                      }
                  })
                })
                // const result = genre.map(e => {
                //     return{
                //         id: e.id,
                //         name: e.name
                //     }
                // })
                 return res.status(200).json(allGenres);
            }catch(e){
                console.log(e)
            }
        }
  
})



module.exports = router;