const mongoose = require('mongoose')
const Schema = mongoose.Schema


const imageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Image', imageSchema)
