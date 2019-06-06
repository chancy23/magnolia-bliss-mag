const bcrypt = require('bcrypt');
const cryptoString = require('crypto-random-string');
const db = require('../models');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer')

module.exports = {
    //used to generate the random token to be used in the reset methods
    forgotPwd: (req, res) => {
        const email = req.body.email;
        console.log('email', email);
        //if email is empty, then say so
        if (email === '') {
            res.json('email required');
        }
        else {
            //create crypto hex token with 20 characters
            const token = cryptoString(20);
            console.log('token', token);

            // find the customer in the db and update with token and expire date of 30 min from now
            db.Customer.findOneAndUpdate(
                {email: email},
                { $set: {
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 18000000
                    } 
                },
                {new: true}
            )
            .then(user => {
                if (user === null) {
                    res.json('no user found');
                }
                else {
                    console.log('user', user);
                    var ADDRESS = process.env.EMAIL_ADDRESS;
                    var PASSWORD = process.env.EMAIL_PASSWORD;
                    let resetURL;

                    if(process.env.NODE_ENV === 'production') {
                        resetURL = `https://magnoliablissmag.com/reset-password`
                    }
                    else {
                        resetURL = `http://localhost:3000/reset-password`
                    };

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: ADDRESS,
                            pass: PASSWORD
                        }
                    });

                    const mailOptions = {
                        from: ADDRESS,
                        // to: `${user.email}`,
                        to: 'chancyleath@hotmail.com',
                        subject: `Password Reset Code`,
                        text: 
                            `You are receiving this email because you, or someone else, has requested the reset of the password for your account.\n\n` +
                            `Your reset code is ${token}.\n\n` +
                            `Enter this code within 30 minutes of receiving it at: ${resetURL} \n\n` +
                            `If you did not make this request, ignore this email and your password will remain unchanged.\n\n` +
                            `Note: This mailbox isn't monitored, so please don't reply.\n`
                    };
                    console.log('sending email'); 

                    //TODO: this isn't sending a json object or message when successful..why?
                    transporter.sendMail(mailOptions, function(err, info) {
                        if (err) {
                            console.error("there was an error: ", err);
                            res.json('error')
                        } else {
                            console.log("here is the result: ", info);
                            res.json("email sent");
                        }
                    })
                };
            })
            .catch(err => res.status(404).json(err));
        };
    },

    resetPwd: (req, res) => {
        console.log('this is the token', req.params.token)
        //get the token either from req.body or req.params
        db.Customer.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        })
        .then(user => {
            console.log('user', user);
            if(user === null) {
                console.log('invalid or expired token')
                res.json('invalid or expired token')
            }
            else {
                res.json('reset code valid')
            }
        })
    },

    //updates our db with the new password and empties the time and token fields
    updatePwd: (req, res) => {
        console.log('req.body.password', req.body.password);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                console.log('hash', hash);
                req.body.password = hash;
                db.Customer.findOneAndUpdate(
                    {resetPasswordToken: req.body.token},
                    { $set: {
                        password: hash,
                        resetPasswordToken: null,
                        resetPasswordExpires: null
                        } 
                    },
                    { new: true })
                .then(user => {
                    if (user !== null) {
                        console.log('password updated');
                        res.json('password updated');
                    }
                    else {
                        console.log('no user found');
                        res.status(404).json('no user found')
                    }
                })
            })
        })
    }

}

