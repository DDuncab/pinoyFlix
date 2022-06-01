const express = require('express');
const router = express.Router();
const {	
		getActors, newActor, getSingleActor, updateActor, deleteActor,
		createActorReview,
		getActorReviews,
		deleteActorReview,
		getAdminActors
	} = require('../controllers/ActorController');

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/actors').get(getActors);
router.route('/aactors').get(getAdminActors);
router.route('/actor/:id').get(getSingleActor);
router.route('/new/actor').post(isAuthenticatedUser,authorizeRoles('admin'),newActor);
router.route('/actor/ud/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateActor).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteActor);

router.route('/areview').put(isAuthenticatedUser, createActorReview)
router.route('/areviews').get(isAuthenticatedUser, getActorReviews)
router.route('/areviews').delete(isAuthenticatedUser, deleteActorReview)
module.exports = router;
