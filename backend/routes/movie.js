const express = require('express');
const router = express.Router();
const {	
		getMovies,
		newMovie,
		getSingleMovie,
		updateMovie, 
		deleteMovie,
		createMovieReview,
		getMovieReviews,
		deleteMovieReview,
		getAdminMovies
	} = require('../controllers/MovieController');
	
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/movies').get(getMovies);
router.route('/amovies').get(getAdminMovies);

router.route('/movie/:id').get(getSingleMovie);
router.route('/movie/new').post(isAuthenticatedUser, authorizeRoles('admin'), newMovie);
router.route('/movie/ud/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateMovie)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteMovie);


router.route('/mreview').put(isAuthenticatedUser, createMovieReview)
router.route('/mreviews').get(isAuthenticatedUser, getMovieReviews)
router.route('/mreviews').delete(isAuthenticatedUser, deleteMovieReview)
module.exports = router;
