const router = require('express').Router()
const pwdController = require('../../controllers/pwdController');


//url /api/password/forgot
router
    .route('/forgot')
    .post(pwdController.forgotPwd)

//url /api/password/update
router
    .route('/update')
    .put(pwdController.updatePwd)

//url /api/password/reset/token ID
router
    .route('/reset/:token')
    .get(pwdController.resetPwd)

module.exports = router;