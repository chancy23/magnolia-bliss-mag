//require the db
const db = require('../models');

//require bcrypt

module.exports = {
    //creating an account
    signup: (req, res) => {
        //req.body will be the fields from the front end
        //use bcrytp to hash and salt the password
        //verify that email isn't already in db

    },
    //login
    login: (req, res) => {
        // req.body will be the email and password from front end

    },



}