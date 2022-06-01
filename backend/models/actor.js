const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter actor name'],
        trim: true,
        maxLength: [100, 'actor name cannot exceed 100 characters'],
    },
    bio: {
        type: String,
        required: [true, 'Please enter actor bio'],
        trim: true,
        maxLength: [500, 'actor bio cannot exceed 500 characters'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    movies: [
        {
            movie: {
                type: mongoose.Schema.ObjectId,
                ref: 'Movie',
                required: true,
            },
            mtitle: {
                type: String,
                required: [true, 'Please enter actor name'],
            },
        },
    ],
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Actor', actorSchema);
