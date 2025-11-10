const MovieController = require('../controllers/movie.controller');

const routes = (app) => {
    app.post('mba/api/v1/movies', MovieController.createMovie);
    // Additional movie routes can be added here
}

module.exports = routes;