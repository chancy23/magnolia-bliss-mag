//require db models
const db = require('../models');
const dotenv = require('dotenv').config();
const moment = require('moment');


const apiKey = process.env.SECRET_KEY
//require stripeand the secret API key from the .env file
const stripe = require('stripe')(apiKey);

module.exports = {
    // retrieve the subscription data either from our DB or from stripe 
    // in order to display details to customer when logged in
    getSubscription: (req, res) => {
        console.log('sub ID from sessions', req.session.customer.subscriptionData.subId);
       //currently getting sub info from stripe's server/db
       //may want to use our own to make faster?
       stripe.subscriptions.retrieve(req.session.customer.subscriptionData.subId)
       .then(subscription => {
           console.log('subscription data', subscription);
            //send the status, plan.nickname, current_period_end, current_invoice_amount to front end
            const subData = {
                status: subscription.status,
                planName: subscription.plan.nickname,
                planId: subscription.plan.id,
                periodEnd: moment.unix(subscription.current_period_end).format('MMM Do YYYY') //convert from unix timestamp
            }
            res.json(subData);
        })
        .catch(err => res.json(err));
    },

    addSubscription: (req, res) => {
        console.log('payment info from front end', req.body) //currnetly just the token
        //then create their stripe account
        stripe.customers.create({
            description: '',
            source: req.body.token, // token obtained with Stripe.js and passed from front end
            email: req.body.email
        }).then(stripeCust => {
            console.log('customer data', stripeCust);
            //this creates the subscription with Stripe and charges the customer card
            stripe.subscriptions.create({
                customer: stripeCust.id,
                items: [{plan: req.body.plan}],
              })
              .then(subDetails => {
                //then store in our own Subscription model as stripeId and plan
                //may need to add status, bill cycle end day, and curent invoice amount, TBD
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
                    .then(data => {
                        console.log('data', data);
                        res.json(data)
                    })
                    .catch(err => res.json(err))
                });
            })
        })
        .catch(err => res.json(err));
    },
    changeSubscription: (req, res) => {
        console.log('req.body', req.body);
        //find the customer in our db using their session info _id
        db.Customer.findById(req.session.customer._id)
        .populate('subscriptionData')
        .then(customer => {
            console.log('customer data:', customer);
            //then send the update to stripe, then update the subscription in our db
            stripe.subscriptions.retrieve(customer.subscriptionData.subId)
            .then(stripeSub => {
                console.log("subscription retrieved from Stripe", stripeSub);
                console.log('items data object in sub', stripeSub.items.data[0]);
                stripe.subscriptions.update(stripeSub.id, {
                    cancel_at_period_end: false,
                    items: [{
                        id: stripeSub.items.data[0].id,
                        plan: req.body.plan
                    }]
                })
                //find the stripe subsciption ID & update subscriptions model with new plan 
                .then(subData => {
                    console.log('subscription data:', subData);
                    db.Subscriptions.findOneAndUpdate(
                        { subId: subData.id },
                        { $push: {plan: subData.plan.id} },
                        { new: true })
                    .then(data => res.json(data))
                })
            })
        })
        .catch(err => res.json(err))
    },
    //when cancelling will not delete the subscription for the stripe db, instead change to stop at cycle end
    //will need to set up a web hook to check if subscription status is active or not, if not block access
    cancelSubscription: (req, res) => {
        console.log('sub ID from sessions', req.session.customer.subscriptionData.subId);
        stripe.subscriptions.update(req.session.customer.subscriptionData.subId,
            { cancel_at_period_end: true }
        )
        .then(data => {
            console.log('data', data);
            res.json(data);
        })
        .catch(err => res.json(err))
    },
    //make it so that if subscription status is still active but cancel_at_period_end is true to change it back to false
    reactivateSubscription: (req, res) => {
        console.log('sub ID from sessions', req.session.customer.subscriptionData.subId);
        stripe.subscriptions.retrieve(req.session.customer.subscriptionData.subId)
        .then(subscription => {
            // console.log('subscription', subscription);
            //if status is active and cancel_at_period_end is true
            if (subscription.status === 'active' && subscription.cancel_at_period_end === true) {
                //set to false
                stripe.subscriptions.update(subscription.id,
                    { cancel_at_period_end: false }
                )
                //may need to update our db if we add anything to our subs model, currently not needed
                .then(data => {
                    console.log('data', data);
                    res.json(data);
                })
                .catch(err => res.json(err))
            } else {
                //else return error message 
                console.log('data not found');
                //grab this response in the front end and display modal to advise of no pending cancellation found
                res.json('no pending cancellation')
            } 
        }).catch(err => res.json(err))
    }
}

// Note: Node.js API does not throw exceptions, and instead prefers the
// asynchronous style of error handling described below.
//
// An error from the Stripe API or an otheriwse asynchronous error
// will be available as the first argument of any Stripe method's callback:
// E.g. stripe.customers.create({...}, function(err, result) {});
//
// Or in the form of a rejected promise.
// E.g. stripe.customers.create({...}).then(
//        function(result) {},
//        function(err) {}
//      );