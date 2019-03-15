//this file speaks to the index.js within each folder (html and api)

// const path = require("path");
const router = require("express").Router();

//link to the folders in the routes folder
const htmlRoutes = require("./html");
// const apiRoutes = require("./api");

// HTML Routes
router.use("/", htmlRoutes);

//API Routes
// router.use('api/', apiRoutes)

module.exports = router;