//require db models
const db = require('../models');
const dotenv = require('dotenv').config();
const moment = require('moment');
const nodemailer = require('nodemailer');

const apiKey = process.env.SECRET_KEY
//require stripeand the secret API key from the .env file
const stripe = require('stripe')(apiKey);


module.exports = {
  // retrieve the subscription data either from our DB or from stripe 
  // in order to display details to customer when logged in to their account
  getSubscription: (req, res) => {
    db.Customer.findById(req.session.customer._id)
      .populate('subscriptionData')
      .then(customer => {
        console.log('sub ID from customer', customer.subscriptionData.subId);
        //currently getting sub info from stripe's server/db
        //may want to use our own to make faster?
        stripe.subscriptions.retrieve(customer.subscriptionData.subId)
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
      })
      .catch(err => res.json(err));
  },
  //get the upcoming invoice data to send to account details page (try to combine with get Sub method)
  getInvoice: (req, res) => {
    db.Customer.findById(req.session.customer._id)
      .populate('subscriptionData')
      .then(customer => {
        stripe.invoices.retrieveUpcoming(customer.subscriptionData.stripeId)
          .then(invoice => {
            console.log('invoice data', invoice);
            const invoiceData = {
              amountDue: invoice.amount_due
            }
            console.log('invoice data obj', invoiceData);
            res.json(invoiceData)
          })
          .catch(err => res.json(err))
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
        items: [{ plan: req.body.plan }],
      })
        .then(subDetails => {
          //then store in our own Subscription model as stripeId and plan
          //may need to add status, bill cycle end day, and curent invoice amount, TBD
          console.log('sub Details', subDetails);
          db.Subscriptions.create({
            stripeId: subDetails.customer,
            subId: subDetails.id,
            plan: req.body.plan,
            // status: subDetails.status,
            pendingCancel: subDetails.cancel_at_period_end
          })
            .then(sub => {
              console.log('sub from line 79', sub);
              db.Customer.findByIdAndUpdate(req.body.id,
                { $set: { subscriptionData: sub._id } },
                { new: true }
              )
                // .populate('subscriptionData')
                .then(data => {
                  console.log('data', data);
                  // if data.subscriptionData !== null then send a confirmation email
                  if (data.subscriptionData !== null) {
                    //variables for email user and password
                    var ADDRESS = process.env.EMAIL_ADDRESS;
                    var PASSWORD = process.env.EMAIL_PASSWORD;

                    //make variables for teh cost add to email (reformat it)
                    const planCost = subDetails.plan.amount / 100;

                    //create Transport
                    const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: ADDRESS,
                        pass: PASSWORD
                      }
                    });

                    //mail options
                    const mailOptions = {
                      from: ADDRESS,
                      // to: `${data.email}`,
                      to: 'chancyleath@hotmail.com',
                      subject: 'Magnolia Bliss Subscription Confirmation',
                      text:
                        `Dear ${data.firstName}, \n\n` +
                        `Thank you for subscribing to Magnolia Bliss on the ${subDetails.plan.nickname} plan at $${planCost} every ${subDetails.plan.interval}. \n\n` +
                        `Note: You will also recieve a separate credit card receipt for your records. \n\n` +
                        `If you have any questions, please contact us by replying to this email. \n\n` +
                        `Happy Reading!`
                    };

                    console.log('sending email');

                    //send email
                    transporter.sendMail(mailOptions, function (err, info) {
                      if (err) {
                        console.error("there was an error: ", err);
                        res.json('error')
                      } else {
                        console.log("here is the result: ", info);
                        res.json("email sent");
                      };
                    });

                    //once subscription is created send to front end
                    res.json({ data: data, message: 'subscription created' })

                  }
                  // else just send an error message to the front
                  else {
                    res.json('there was an error, subscription not created')
                  }
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
        // console.log('customer data:', customer);
        //then send the update to stripe, then update the subscription in our db
        stripe.subscriptions.retrieve(customer.subscriptionData.subId)
          .then(stripeSub => {
            // console.log("subscription retrieved from Stripe", stripeSub);
            // console.log('items data object in sub', stripeSub.items.data[0]);
            stripe.subscriptions.update(stripeSub.id, {
              cancel_at_period_end: false,
              items: [{
                id: stripeSub.items.data[0].id,
                plan: req.body.plan
              }]
            })
              //find the stripe subsciption ID & update subscriptions model with new plan 
              .then(subData => {
                // console.log('subscription data:', subData);
                db.Subscriptions.findOneAndUpdate(
                  { subId: subData.id },
                  { $set: { plan: subData.plan.id } },
                  { new: true })
                  .then(data => {
                    //if updated correctly then send an email confirmatin
                    // console.log('data', data);
                    if (data._id !== null) {
                      //variables for email user and password
                      var ADDRESS = process.env.EMAIL_ADDRESS;
                      var PASSWORD = process.env.EMAIL_PASSWORD;

                      //make variables for teh cost add to email (reformat it)
                      const planCost = subData.plan.amount / 100;
                      const date = moment().format('MMM Do YYYY');

                      //create Transport
                      const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: ADDRESS,
                          pass: PASSWORD
                        }
                      });


                      //mail options
                      const mailOptions = {
                        from: ADDRESS,
                        to: `${customer.email}`,
                        // to: 'chancyleath@hotmail.com',
                        subject: 'Magnolia Bliss Plan Change Confirmation',
                        text:
                          `Dear ${customer.firstName}, \n\n` +
                          `Our records show that on ${date} you updated your subscription plan to the ${subData.plan.nickname} plan at $${planCost} per ${subData.plan.interval}. \n\n` +
                          `If you have any questions, please contact us by replying to this email. \n\n` +
                          `Thank you for your continued business!`
                      };

                      console.log('sending email');

                      //send email
                      transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                          console.error("there was an error: ", err);
                          res.json('error')
                        } else {
                          console.log("here is the result: ", info);
                          res.json("email sent");
                        };
                      });
                      //send response to front end confrimation plan change.
                      res.status(200).json({message: 'plan change success'});
                    }
                    else {
                      res.json({message: 'plan not changed due to error'})
                    }
                  })
                  .catch(err => res.json(err))
              })
          })
      })
      .catch(err => res.json(err))
  },
  //when cancelling will not delete the subscription for the stripe db, instead change to stop at cycle end
  cancelSubscription: (req, res) => {
    // console.log('req.body', req.body);
    // console.log('sub ID from obj', req.body.subId);
    stripe.subscriptions.update(req.body.subId,
      { cancel_at_period_end: true }
    )
      .then(subData => {
        console.log('sub Data line 248:', subData);
        //update our db and set cancelPending to true based on subID
        db.Subscriptions.findByIdAndUpdate(
          req.body.customerSubId,
          { $set: { pendingCancel: true } },
          { new: true }
        )
        .then(data => {
          //if updated correctly then send an email confirmatin
          console.log('data line 257', data);
          if (data.pendingCancel === true) {
            //variables for email user and password
            var ADDRESS = process.env.EMAIL_ADDRESS;
            var PASSWORD = process.env.EMAIL_PASSWORD;

            const date = moment().format('MMM Do YYYY');
            const periodEnd = moment.unix(subData.current_period_end).format('MMM Do YYYY');

            //create Transport
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: ADDRESS,
                pass: PASSWORD
              }
            });


            //mail options
            const mailOptions = {
              from: ADDRESS,
              // to: `${customer.email}`,
              to: 'chancyleath@hotmail.com',
              subject: 'Magnolia Bliss Subscription Cancellation',
              text:
                `Hello, \n\n` +
                `This email is to confirm your cancellation to Magnolia Bliss on ${date}. \n\n` +
                `   * You will have access to the magazine and any applicable Ask a Coach and/or life` +
                `coaching sessions until the end of your subscription period on ${periodEnd}. \n` +
                `   * If you change your mind before then, you can reactivate it by going to "Manage" once you've logged into Magnolia Bliss. \n` +
                `   * After ${periodEnd} you will need to sign up for a new subscription. \n\n` +
                `Thank you for your business, we are sorry to see you go.`
            };

            console.log('sending email');

            //send email
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                console.error("there was an error: ", err);
                res.json('error', err)
              } else {
                console.log("here is the result: ", info);
                res.json("email sent");
              };
            });
            //send response to front end
            res.json(data);
          }
          else {
            res.json({message: 'cancellation not processed due to an error'})
          }
            
          })
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  },
  //make it so that if subscription status is still active but cancel_at_period_end is true to change it back to false
  reactivateSubscription: (req, res) => {
    stripe.subscriptions.retrieve(req.body.subId)
      .then(subscription => {
        // console.log('subscription', subscription);
        //if status is active and cancel_at_period_end is true
        if (subscription.status === 'active' && subscription.cancel_at_period_end === true) {
          //set to false
          stripe.subscriptions.update(
            subscription.id,
            { cancel_at_period_end: false }
          )
            .then(subData => {
              console.log('sub Data line 163:', subData);
              //update our db and set cancelPending to false based on subID
              db.Subscriptions.findByIdAndUpdate(
                req.body.customerSubId,
                { $set: { pendingCancel: false } },
                { new: true }
              )
                .then(data => res.json(data))
                .catch(err => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err))
        } else {
          //else return error message 
          console.log('data not found');
          //grab this response in the front end and display modal to advise of no pending cancellation found
          res.json('no pending cancellation')
        }
      }).catch(err => res.json(err))
  },

  updatePaymentInfo: (req, res) => {
    //send a new token to save to the customer in the stripe db
    console.log('req body', req.body);
    stripe.customers.update(
      req.session.customer.subscriptionData.stripeId,
      { source: req.body.token }
    )
      .then(customer => {
        // console.log('customer payment method updated', customer);
        res.json('success')
      })
      .catch(err => res.status(422).json(err))
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