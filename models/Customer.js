const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    subscriptionData: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    }
})

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;