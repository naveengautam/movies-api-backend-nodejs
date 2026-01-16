const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
//console.log('Environment Variables:', process.env);
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie.routes');
const userRoutes = require('./routes/user.routes');

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configure CORS for specific origin
app.use(cors({
  origin: 'http://localhost:5173' // Your frontend origin
}));
movieRoutes(app);
userRoutes(app);



app.get('/', (req, res) => {
    console.log('Root endpoint accessed');
    res.json({
        message: 'Aapka swagat hai!',
        success: true
    })
})

app.listen(process.env.PORT, ()=> {
    console.log('Server is running on port 3000');
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
});