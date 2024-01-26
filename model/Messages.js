const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MessagesSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    readMsg: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Messages', MessagesSchema)

