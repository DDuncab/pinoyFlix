const express = require('express');
const app = express();

const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Movie = require('./models/movie')
const Actor = require('./models/actor')
const Producer = require('./models/producer')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

//try and catch para malaman at mahanap san banda ung error
const errorMiddleware = require('./middlewares/errors');

//crud nang movie 
const movie = require('./routes/movie');
app.use('/api',movie);

//crud nang actor 
const actor = require('./routes/actor');
app.use('/api',actor);

//crud nang actor 
const producer = require('./routes/producer');
app.use('/api',producer);

// login , register , user and admin
const auth = require('./routes/auth');
app.use('/auth',auth);


app.use(errorMiddleware);
module.exports = app