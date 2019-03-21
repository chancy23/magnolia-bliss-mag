const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    //this stuff will be passed back from the stripe API once they customer purchases a sub
    stripeId: {
        type: String,
        require: true
    },
    subId: {
        type: String,
    },
    plan: [{
        type: String
    }]
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription