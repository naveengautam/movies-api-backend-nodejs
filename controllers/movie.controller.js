const Movie = require('../models/movies.model');

// Controller to create a new movie

exports.createMovie = async (req, res) => {
    try {
        const movieData = req.body;
        console.log('Received movie data:', movieData);
        const newMovie = await Movie.create(movieData);
        res.status(201).json({
            message: 'Movie created successfully',
            success: true,
            data: newMovie,
            error: {}
        });
    } catch(error) {
        console.log('Received movie data:', req.body);
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        })
    }
}
// Controller to get all movies
exports.getallMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            message: 'Movies fetched successfully',
            success: true,
            data: movies,
            error: {}
        });
    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        });
    }
}

// Controller to get a movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found',
                success: false,
                data: {},
                error: 'No movie with the given ID'
            });
        }
        res.status(200).json({
            message: 'Movie fetched successfully',
            success: true,
            data: movie,
            error: {}
        });
    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        });
    }
}

// Controller to find a movie by title
exports.getMovieByTitle = async (req, res) => {
    try {
        const title = req.params.title;
        const movie = await Movie.findOne({ title: title });
        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found',
                success: false,
                data: {},
                error: 'No movie with the given title'
            });
        }
        res.status(200).json({
            message: 'Movie fetched successfully',
            success: true,
            data: movie,
            error: {}
        });
    }   catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        });
    }
}

// Controller to delete a movie
exports.deleteMovieById = async (req, res) => {
    const movieId = req.params.id;
    try {
        const deleteMovie = await Movie.findByIdAndDelete(movieId);
        if (!deleteMovie) {
            return res.status(404).json({
                message: 'Movie not found',
                success: false,
                data: {},
                error: 'No movie with the given ID'
            });
        }
        res.status(200).json({
            message: 'Movie deleted successfully',
            success: true,
            data: deleteMovie,
            error: {}
        });
    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        });
    }
}
