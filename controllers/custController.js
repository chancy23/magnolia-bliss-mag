const db = require('../models');

module.exports = {
    //get customer info to display on user admin page, so that when updated can update
    getCustomerDetails: (req, res) => {
        db.Customer.findById(req.session.customer._id)
        .populate('subscriptionData')
        .then(customer => {
            console.log('customer data line 9', customer);
            res.json(customer)
        }).catch(err => res.json(err))
    },

    //update customer info
    updateCustInfo: (req, res) => {
        console.log('req.body', req.body);
        console.log('session data', req.session.customer)
        //if update email then also send to subscription update to stripe
        //send to the db
        db.Customer.findByIdAndUpdate(req.session.customer._id, 
            { $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
                }
            },
            { new: true }
        )
        .then(data => {
            console.log('customer info update');
            res.json(data);
        })
    },
    //remove customer from our db if they cancel subscribing before paying.
    deleteCustomer: (req, res) => {
        console.log('id from sessions', req.session.customer._id);
        db.Customer.findById(req.session.customer._id)
        .then(customer => {
            //need to test out after 6/18 on sandy@test.com account
            //set up new sub but cancel payment
            if(customer.subscriptionData !== undefined) {
                console.log('customer has previous sub Data, request ignored')
                res.status(404).json('customer has subData, not deleted from db')
            }
            else {
                db.Customer.findByIdAndDelete(req.session.customer._id)
                //if the cusotmer as subscription data then return a message that not deleted
                //if not sub data then delete customer from db
                .then(data => {
                    console.log('customer deleted');
                    res.status(200).json('deleted');
                })
                .catch(err => res.json(err));
            }
        })
        .catch(err => res.status(422).json(err));
    }
}