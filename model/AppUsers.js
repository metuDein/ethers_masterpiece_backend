const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number,
    },
    walletAddress: {
        type: String,
        default: ''
    },
    privateKey: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        default: 0
    },
    public_id: String,
    refreshToken: String
},
    {
        timestamps: true
    })


module.exports = mongoose.model('User', userSchema)