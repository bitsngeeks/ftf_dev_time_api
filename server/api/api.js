var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));

router.use('/clients', require('./client/clientRoutes'));
router.use('/projects', require('./project/projectRoutes'));
router.use('/tracker', require('./tracker/trackerRoutes'));


module.exports = router;
