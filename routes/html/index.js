const router = require("express").Router();
const html = require("./html");

//tell the index file in the routes folder to use the html routes in the html folder
router.use("/", html);

module.exports = router;