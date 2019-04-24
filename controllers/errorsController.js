const db = require('../models');

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
    viewAllErrors: (req, res) => {

    }
}