const db = require('../models');

module.exports = {
    //get customer info?

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
    }
}