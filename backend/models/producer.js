const mongoose = require('mongoose')
const validator = require('validator');
const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter actor name'],
        trim: true,
        maxLength: [100, 'actor name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    contact_num: {
        type: Number,
        required: [true, 'Please enter your contact number'],
        unique: true,
        minLength: [11, 'actor name cannot exceed 11 digit']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    movies: [
        {
            movie: {
                type: mongoose.Schema.ObjectId,
                ref: 'Movie',
                required: true
            },
            mtitle: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Producer', producerSchema);
