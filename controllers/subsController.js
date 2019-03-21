//require db models
const db = require('../models');

const apiKey = process.env.SECRET_KEY
console.log('apikey', apiKey);

//require stripeand the secret API key from the .env file
const stripe = require('stripe')(apiKey);

module.exports = {
    
    // create a customer using data from the front end to send to stripe
    //then it does the charge to the cusotmer not the card (until cancelled)
    // docs: https://stripe.com/docs/saving-cards
    // use Elements on the front end to get payment information and tie to the customer here
    addSubscription: (req, res) => {
        // console.log('apikey', apiKey);
        console.log('payment info from front end', req.body) //currnetly just the token
        //then create their stripe account
        stripe.customers.create({
            description: '',
            source: req.body.token, // token obtained with Stripe.js and passed from front end
            email: req.body.email
            //}, function(err, customer) {
            //     console.log('customer data', customer);
                // asynchronously called

        //once customer is created in stripe then do the subscriptions
        //or the charge then the subscripiton...the docs are not clear on this
        //this might replace the  above function
        }).then(stripeCust => {
            console.log('customer data', stripeCust);
            //this creates the subscription with Stripe
            stripe.subscriptions.create({
                customer: stripeCust.id,
                items: [{plan: req.body.plan}],
              })
              .then(subDetails => {
                //then store in our own Subscription model as stripeId and plan
                console.log('sub Details', subDetails);
                db.Subscriptions.create({
                    stripeId: subDetails.customer,
                    subId: subDetails.id,
                    plan: req.body.plan
                })
                .then(sub => {
                    //update the customer model with the subscription info
                    db.Customer.findByIdAndUpdate(req.body.id,
                    { $push: {subscriptionData: sub._id} },
                    { new: true})
                    .then(data => res.json(data))
                })
              });
        })
        .catch(err => res.json(err));
    }

}