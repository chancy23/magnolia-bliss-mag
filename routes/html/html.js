// gets the file/views to load from the controller to load from the controllers file)

const router = require("express").Router();
const htmlController = require('../../controllers/htmlController');


//url: / 
router
    .route("/")
    .get(htmlController.loadHome)

//url: /magazine
router
    .route("/magazine")
    .get(htmlController.loadMagView)

//use this by default if incorrect URl is input
router
    .route('*')
    .get(htmlController.load404)


module.exports = router