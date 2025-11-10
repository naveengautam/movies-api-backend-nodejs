const dotenv = require('dotenv');
dotenv.config();
//console.log('Environment Variables:', process.env);
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie.routes');

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
movieRoutes(app);

app.get('/', (req, res) => {
    console.log('Root endpoint accessed');
    res.json({
        message: 'Aapka swagat hai!',
        success: true
    })
})

app.listen(process.env.PORT, ()=> {
    console.log('Server is running on port 3000');
    console.log('MongoDB URL:', process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
});