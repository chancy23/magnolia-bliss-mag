const router = require('express').Router();
const errorsController = require('../../controllers/errorsIssuesController');

// url /api/errors/create
router
    .route('/create')
    .post(errorsController.createError)

// url /api/errors/sendIssue
router
    .route('/sendIssue')
    .post(errorsController.sendIssue)

module.exports = router;