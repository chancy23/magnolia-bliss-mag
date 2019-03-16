const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    //the number of issues selected
    issues: {
        type: Number,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    //the expiration data base on teh number of issues, this will be used to stop the user from going 
    // to the magazine view once their number of issues has been seen
    //if they pick 3 issues, expiration date would be 3 months
    //or maybe we just track the number of issues after their payment date and I can add payment date instead of expiration datee
    expirationDate: {
        type: Date,
        require: true
    }

})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription