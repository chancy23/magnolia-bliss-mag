//this file speaks to the index.js within each folder (html and api)
// const path = require("path");
const router = require("express").Router();
//link to the folders in the routes folder
const htmlRoutes = require("./html");
const apiRoutes = require("./api");

//API Routes (must go before HTML Routes to avoid getting errors and 404 page)
router.use('/api', apiRoutes)

// HTML Routes
router.use("/", htmlRoutes);

module.exports = router;