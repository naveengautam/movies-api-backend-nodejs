const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true }, 
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true }, // duration in minutes
    rating: { type: Number, required: true }, // rating out of 10    
    casts: [{ type: String, required: true }],
    language: { type: String, required: true,default: 'English' },
    posterUrl: { type: String, required: true }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;