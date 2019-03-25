const router = require('express').Router();
const subsController = require('../../controllers/subsController');

// url is api/subscription/details
router
    .route('/details')
    .get(subsController.getSubscription)

// url is api/subscription/new
router
    .route('/new')
    .post(subsController.addSubscription)

// url api/subscription/cancel
//using a put rather then a delete command since will change the cancel_at_period_end rather than deleting sub
router  
    .route('/cancel')
    .put(subsController.cancelSubscription)

// url api/subscription/change
router
    .route('/change')
    .put(subsController.changeSubscription)

// url api/subscription/reactivate
router
    .route('/reactivate')
    .put(subsController.reactivateSubscription)

module.exports = router