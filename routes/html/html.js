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

//url: /magazine
router
    .route('/magazine')
    .get(htmlController.loadMagView)

// for the subscription page
//url /subscribe
router
    .route('/subscribe')
    .get(htmlController.loadSubscribe)

//use this by default if incorrect URl is input
router
    .route('*')
    .get(htmlController.load404)


module.exports = router