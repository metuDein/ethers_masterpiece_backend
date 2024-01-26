const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CartSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cart', CartSchema)