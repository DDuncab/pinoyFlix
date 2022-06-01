const express = require('express');
const router = express.Router();
const {	
		getProducers, newProducer, getSingleProducer, updateProducer, deleteProducer ,getAdminProducers	
	} = require('../controllers/ProducerController');

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/producers').get(getProducers);
router.route('/aproducers').get(getAdminProducers);
router.route('/producer/:id').get(getSingleProducer);
router.route('/new/producer').post(isAuthenticatedUser,authorizeRoles('admin'),newProducer);
router.route('/producer/ud/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProducer).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducer);

module.exports = router;
