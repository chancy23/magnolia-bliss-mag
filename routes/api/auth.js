const router = require('express').Router();
const authController = require('../../controllers/authController');

//route for signing up
//url is /api/auth/signup
router
    .route('/signup')
    .post(authController.signup)

//route for logging in
//url is /api/auth/signup
router
    .route('/login')
    .post(authController.login)

//route for forgot password

//route for reset pass word
