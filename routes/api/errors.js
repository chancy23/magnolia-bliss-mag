const router = require('express').Router();

const errorsController = require('../../controllers/errorsController');

router
    .route('/api/errors/create')
    .post(errorsController.createError);

router
    .route('/api/errors/create')
    .get(errorsController.viewAllErrors);

module.exports = router;