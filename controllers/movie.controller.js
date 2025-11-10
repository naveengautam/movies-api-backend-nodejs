const Movie = require('../models/movies.model');

// Controller to create a new movie

exports.createMovie = async (req, res) => {
    try {
        const movieData = req.body;
        const newMovie = await Movie.create(movieData);
        res.status(201).json({
            message: 'Movie created successfully',
            success: true,
            data: newMovie,
            error: {}
        });
    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        })
    }
}