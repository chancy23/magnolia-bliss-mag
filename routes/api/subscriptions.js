const router = require('express').Router();
const subsController = require('../../controllers/subsController');


// url api/subscription/cancel
//using a put rather then a delete command since will change the cancel_at_period_end rather than deleting sub
router  
    .route('/cancel')
    .put(subsController.cancelSubscription)

// url api/subscription/change
router
    .route('/change')
    .put(subsController.changeSubscription)

// url is api/subscription/details
router
    .route('/details')
    .get(subsController.getSubscription)

// url is api/subscription/invoice
router
    .route('/invoice')
    .get(subsController.getInvoice)

// url is api/subscription/new
router
    .route('/new')
    .post(subsController.addSubscription)
    
// url api/subscription/reactivate
router
    .route('/reactivate')
    .put(subsController.reactivateSubscription)

router
    .route('/updatePayment')
    .put(subsController.updatePaymentInfo)

module.exports = router