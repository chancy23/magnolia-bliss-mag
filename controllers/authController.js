const db = require('../models');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const moment = require('moment');

const apiKey = process.env.SECRET_KEY
//require stripe and the secret API key from the .env file
const stripe = require('stripe')(apiKey);

// const subsController = require('./subsController');

module.exports = {
    //creating an account
    signup: (req, res) => {
        //req.body will be the fields from the front end
        // console.log('customer info', req.body);
        //use bcrytp to hash and salt the password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                //stores hashed password as the password
                req.body.password = hash;
                 //verify that email/customer isn't already in db
                db.Customer.findOne({
                    email: req.body.email
                }).then(email => {
                    if (email !== null) {
                        console.log('email already in DB');
                        //on the front end when get this message display approp error to user
                        res.json('invalid');
                    }
                    else {
                        //add the data into the database in the Customer Model
                        db.Customer.create(req.body)
                        .then(userData => {
                            // console.log('customerData', userData);
                            let userObj = {
                                _id: userData._id,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                email: userData.email
                            };
                            req.session.customer = userObj;
                            console.log('req.session.customer', req.session.customer);
                            req.session.customer.loggedIn = true;
                            //return the customer document 
                            // res.json(userData)
                            //or session
                            res.json(req.session.customer)
                        })
                        //if an error throw err
                        .catch(err => res.json(err))
                    }
                })
            })
        })
    },
    login: (req, res) => {
        // req.body will be the email and password from front end
        //find customer by their email
        console.log('login data from front', req.body);
        db.Customer.findOne({
            email: req.body.email
        })
        .populate('subscriptionData')
        .then(userData => {
            console.log('userData:', userData);
            //if no email is found send error
            if (userData === null) {
                console.log('user not found');
                res.json('invalid email');
            }
            else {
                //else verify that password matches
                bcrypt.compare(req.body.password, userData.password, function(err, pwMatch) {
                    // if password matches then set the session data to the user data
                    if (pwMatch === true) {
                        //call the stripe API to check sub status
                        stripe.subscriptions.retrieve(userData.subscriptionData.subId)
                        .then(subscription => {
                            // console.log('subscription data line 82 of login', subscription);
                                //if subscription is active, log in
                                if(subscription.status === 'active' && subscription.cancel_at_period_end === false) {
                                    req.session.customer = {
                                        _id: userData._id,
                                        firstName: userData.firstName,
                                        lastName: userData.lastName,
                                        email: userData.email,
                                        subscriptionData: userData.subscriptionData
                                    }
                                    req.session.customer.loggedIn = true;
                                    res.status(200).json(req.session.customer);
                                }
                                //if canceled or not paid send message to front end
                                else {
                                    res.status(404).json('no subscription');
                                }
                                
                        })
                        .catch(err => res.json(err));
                    }
                   //else show that invalid password and send err to front end
                    else {
                        console.log("Passwords don't match");
                        res.json('invalid password');
                    }   
                })
            } 
        })
    },
    session: (req, res) => {
        console.log('api/auth/session route hit in controller');
        res.json(req.session.customer);
    },
    logout: (req, res) => {
        if(req.session) {
            console.log('User logged out');
            //clear the session object
            req.session.customer = {};
            res.status(200).json("logged out")
        }
    }
}

//test data:
// {
// "firstName": "Test",
// "lastName": "Customer",
// "email": "customer@test.com",
// "password": "1234"
// }