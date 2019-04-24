const router = require('express').Router();
const custController = require('../../controllers/custController');

//url api/customer/details
router
    .route('/details')
    .get(custController.getCustomerDetails)

//url api/customer/update
router
    .route('/update')
    .put(custController.updateCustInfo)

//url api/customer/update
router
    .route('/delete')
    .delete(custController.deleteCustomer)

    module.exports = router;