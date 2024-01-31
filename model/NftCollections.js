const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    banner: String,
    owner: {
        type: String,
        required: true
    },
    gasfee: {
        type: Boolean,
        default: false
    },
    gasfeeamount: {
        type: Number,
        default: 0.3
    },
    network: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('NftColletion', CollectionSchema)
