// gets the file/views to load from the controller to load from the controllers file)

const router = require("express").Router();
const htmlController = require('../../controllers/htmlController');


//url: / 
router
    .route('/')
    .get(htmlController.loadHome)

router
    .route('/about')
    .get(htmlController.loadAbout)

router
    .route('/account')
    .get(htmlController.loadAccount)

//url: /magazine
router
    .route('/magazine')
    .get(htmlController.loadMagView)

//url /subscribe
router
    .route('/subscribe')
    .get(htmlController.loadSubscribe)

//url /forgot-password
router
    .route('/forgot-password')
    .get(htmlController.loadForgotPassword)

//url /reset-password
router
    .route('/reset-password')
    .get(htmlController.loadResetPassword)

//use this by default if incorrect URl is input
router
    .route('*')
    .get(htmlController.load404)


module.exports = router