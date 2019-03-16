//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
const mongoose = require("mongoose");

//defines as express as our server
const app = express();
const PORT = process.env.PORT || 3000;

// Define middleware here, parses data to and from DB
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve up static assets (usually on heroku)
app.use(express.static("public"));

// Add routes for both HTML and API
const routes = require("./routes");
app.use(routes);

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB sets up to use in production and in dev
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/magnolia_bliss_db"
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

console.log(MONGODB_URI);;

// Start the the server
app.listen(PORT, function() {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});

// module.exports = app;