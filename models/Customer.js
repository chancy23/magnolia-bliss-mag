const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    //put in an array since they can have more than one subscription if they renew for a new one, etc
    subscriptionData: {
        type: Schema.Types.ObjectId,
        ref: "Subscription"
    }
})

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;