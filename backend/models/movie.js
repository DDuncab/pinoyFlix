const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    mtitle: {
        type: String,
        required: [true, 'Please enter movie name'],
        trim: true,
        maxLength: [100, 'movie name cannot exceed 100 characters'],
    },
    plot: {
        type: String,
        required: [true, 'Please enter movie description'],
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
    genre: {
        type: String,
        required: [true, 'Please select genre for this movie'],
        enum: {
            values: [
                'Action',
                'Romance',
                'Sci-Fi',
                'Survival',
                'Fantasy',
                'Historical',
            ],
            message: 'Please select correct genre for movie',
        },
    },
    producerslist: [
        {
            producer: {
                type: mongoose.Schema.ObjectId,
                ref: 'Producer',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
    ],
    actorslist: [
        {
            actor: {
                type: mongoose.Schema.ObjectId,
                ref: 'Actor',
                required: true,
            },
            name: {
                type: String,
                required: true,
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

module.exports = mongoose.model('Movie', movieSchema);
