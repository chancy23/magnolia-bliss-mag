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
    plan: {
        type: String
    }
    //if can figure out webhooks and have our db updated daily with these add them
    //or call the stripe db to get them
    //add field for status (subscription.status from stripe)
    //add field for bill cycle (subscription.current_period_end) from stripe)
    // add field for current invoice amount (subscription.latest_invoice) but need to make a call to their invoice db to get the amount using this id
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription