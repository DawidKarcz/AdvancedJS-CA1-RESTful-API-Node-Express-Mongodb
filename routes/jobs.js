const express = require('express');
const router = express.Router();

//Importing jobs controller methods
const { 
    getJobs,
    getJob,
    newJob,
    updateJob,
    deleteJob,
    jobStats


} = require('../controllers/jobsController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/stats/:topic').get(jobStats);


router.route('/job/new').post(isAuthenticatedUser, authorizeRoles('employeer', 'admin'), newJob);

router.route('/job/:id').put(isAuthenticatedUser, authorizeRoles('employeer', 'admin'), updateJob);

router.route('/job/:id').delete(isAuthenticatedUser, authorizeRoles('employeer', 'admin'), deleteJob);
module.exports = router;