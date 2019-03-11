//Dependencies
const express = require("express");

// const mongoose = require("mongoose");
//set up to use routes in an MVC architecture
// const routes = require("./routes");

//defines as express as our server
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here, parses data to and from DB
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view (view is handled by React when using it, so no html routes will be needed)
// app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/NAME OF YOUR DB HERE");

// Start the the server
app.listen(PORT, function() {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});