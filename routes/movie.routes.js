const MovieController = require('../controllers/movie.controller');
const JWTToken = require('../middleware/jwt.middleware')

const routes = (app) => {
    app.post('/pma/v1/movies', JWTToken.protect, MovieController.createMovie);
    app.get('/pma/v1/movies/getall', MovieController.getallMovies);
    app.get('/pma/v1/movies/:id', MovieController.getMovieById);
    //app.put('/pma/v1/movies/:id', MovieController.updateMovieById);
    app.delete('/pma/v1/movies/:id',  JWTToken.protect, MovieController.deleteMovieById);
    // Additional movie routes can be added here
}

module.exports = routes;