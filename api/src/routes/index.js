const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre, Videogames } = require('../db');
const videoGamesModules = require('./modules/videogames.js');
const videogameMoules = require('./modules/videogame.js');
const genreModules = require('./modules/genres.js');


const router = Router();
router.use('/videogames', videoGamesModules);
router.use('/videogame', videogameMoules);
router.use('/genres', genreModules);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
