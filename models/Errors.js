const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorsSchema = new Schema({
    description: {
        type: String
    },
    occurredAt: {
        type: Date
    },
    userData: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
})

const Errors = mongoose.model('Errors', ErrorsSchema);

module.exports = Errors;