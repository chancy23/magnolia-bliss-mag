const router = require('express').Router();
const subscontroller = require('../../controllers/subsController');

// url is api/subscription/new
router
    .route('/new')
    .post(subscontroller.addSubscription)


module.exports = router