//try and catch para malaman at mahanap san banda ung error
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

//Pang Search nang Movie Depende sa Query na binigay
const APIFeatures = require('../utils/apiFeatures');
var mongoose = require('mongoose');
//Model nang movie para makuha ung mga Table name sa MongoDB
var Movie = mongoose.model('Movie');
var Producer = mongoose.model('Producer');
var Actor = mongoose.model('Actor');
const Filter = require('bad-words');

const cloudinary = require('cloudinary');
exports.newMovie = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'actors',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;

    const dact = await Actor.findById(req.body.actors);
    const dpro = await Producer.findById(req.body.producers);

    req.body.actorslist = [
        {
            actor: dact._id,
            name: dact.name,
        },
    ];
    req.body.producerslist = [
        {
            producer: dpro._id,
            name: dpro.name,
        },
    ];

    const movie = await Movie.create(req.body);

    let movie_relation = {
        movies: [
            {
                movie: movie._id,
                mtitle: movie.mtitle,
            },
        ],
    };

    await Actor.findByIdAndUpdate(dact._id, movie_relation, {
        new: true,
        runValidators: true,
        useFindandModify: false,
    });
    await Producer.findByIdAndUpdate(dpro._id, movie_relation, {
        new: true,
        runValidators: true,
        useFindandModify: false,
    });

    res.status(201).json({
        success: true,
        movie,
    });
});

exports.getMovies = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4;
    const moviesCount = await Movie.countDocuments();

    const apiFeatures = new APIFeatures(Movie.find(), req.query)
        .search()
        .filter();
    console.log(req.query);
    apiFeatures.pagination(resPerPage);
    let movies_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        moviesCount,
        movies: movies_query,
        filteredMoviesCount: movies_query.length,
        resPerPage,
    });
});

exports.getSingleMovie = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);
    console.log(movie);

    if (!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }

    res.status(200).json({
        success: true,
        movie,
    });
});

exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting images associated with the movie
        for (let i = 0; i < movie.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(
                movie.images[i].public_id
            );
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'movies',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false,
    });

    res.status(200).json({
        success: true,
        movie,
    });
});

exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }
    await Movie.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Movie deleted',
    });
});

// Get all movies (Admin)  =>   /api/admin/movies
exports.getAdminMovies = catchAsyncErrors(async (req, res, next) => {
    const movies = await Movie.find();

    res.status(200).json({
        success: true,
        movies,
    });
});

// Create new review   =>   /api/review
exports.createMovieReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, movieID } = req.body;
    const filter = new Filter();
    const filtereComment = filter.clean(comment);
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        filtereComment,
    };

    const movie = await Movie.findById(movieID);

    const isReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        movie.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = filtereComment;
                review.rating = rating;
            }
        });
    } else {
        movie.reviews.push(review);
        movie.numOfReviews = movie.reviews.length;
    }

    movie.ratings =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

    await movie.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get movie Reviews   =>   /api/reviews
exports.getMovieReviews = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: movie.reviews,
    });
});

// Delete movie Review   =>   /api/reviews
exports.deleteMovieReview = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.query.movieId);

    console.log(movie);

    const reviews = movie.reviews.filter(
        (review) => review._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        reviews.length;

    await Movie.findByIdAndUpdate(
        req.query.movieId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
