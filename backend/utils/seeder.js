const Product = require('../models/movie');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const movies = require('../movie_data');
dotenv.config({ path: 'backend/config/config.env' })
connectDatabase();
console.log(movies);
const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Movie are deleted');
        await Product.insertMany(movies)
        console.log('All Movie are added.')
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}
seedProducts()