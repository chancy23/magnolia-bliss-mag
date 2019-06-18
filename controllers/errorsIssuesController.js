const db = require('../models');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
    createError: (req, res) => {
        console.log('error data', req.body)
        db.Errors.create(req.body)
        .populate('Customer')
        .then(errorData => {
            console.log('error added to DB:', errorData);
            res.json(errorData);
        })
        .catch(err => res.json(err));
    },

    // viewAllErrors: (req, res) => {

    // }, 

    //send feedback and issues regarding site to chancy
    sendIssue: (req, res) => {
        console.log(req.body);
        //don't need to save to DB just send nodemailer with content to chancy

        //variables for email user and password
        var ADDRESS = process.env.EMAIL_ADDRESS;
        var PASSWORD = process.env.EMAIL_PASSWORD;


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
          to: 'chancyleath@hotmail.com',
          subject: `Magnolia Bliss Site ${req.body.contactReason}`,
          text:
            `Type: ${req.body.contactReason} \n\n` +
            `Submitter: ${req.body.submitterFirstName} ${req.body.submitterLastName} \n\n` +
            `Submitter's Email: ${req.body.submitterEmail} \n\n` +
            `Details: \n` +
            `${req.body.feedbackDetails}`
        };

        console.log('sending email');

        //send email
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.error("there was an error: ", err);
            res.json('error')
          } else {
            console.log("here is the result: ", info);
            res.json("email sent to admin");
          };
        });

        //once email is sent notify front end
        // res.json({ data: data, message: 'email sent to admin' })
    
    }
}