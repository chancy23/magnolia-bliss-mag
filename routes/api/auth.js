const router = require('express').Router();
const authController = require('../../controllers/authController');

//url is /api/auth/signup
router
    .route('/signup')
    .post(authController.signup)

//url is /api/auth/login
router
    .route('/login')
    .post(authController.login)

// url /api/auth/session
router
    .route('/session')
    .get(authController.session)
  
// url /api/auth/logout  
router
    .route('/logout')
    .get(authController.logout)

module.exports = router
