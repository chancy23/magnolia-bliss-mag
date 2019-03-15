//this goes imports the items from each file in the html folder (sends to index.js in routes folder)

const router = require("express").Router();
const htmlRoutes = require("./html");

// url: magnoliablissmag/ (just the "/" will load main page)
router.use("/", htmlRoutes);

// url: magnoliablissmag/magazine
router.use("/magazine", htmlRoutes);

// if no route is hit correctly, routes to the home page
router.use("*", htmlRoutes);



module.exports = router;