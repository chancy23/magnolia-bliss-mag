const router = require('express').Router();
const custController = require('../../controllers/custController');

//url api/customer/update
router
    .route('/update')
    .put(custController.updateCustInfo)

    module.exports = router;