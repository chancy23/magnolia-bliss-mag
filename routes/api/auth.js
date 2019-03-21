const router = require('express').Router();
const authController = require('../../controllers/authController');

//route for signing up
//url is /api/auth/signup
router
    .route('/signup')
    .post(authController.signup)

//route for logging in
//url is /api/auth/login
router
    .route('/login')
    .post(authController.login)

// url /api/auth/session
router
    .route('/session')
    .get(authController.session)
  
  router
    .route('/logout')
    .get(authController.logout)

module.exports = router
