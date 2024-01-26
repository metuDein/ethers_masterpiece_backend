const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AssetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        default: 'Ether Master Creator Community Admin'
    },
    collectionName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    network: {
        type: String,
        required: true
    },
    supply: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        default: 'NFTs'
    },
    likes: {
        type: Number,
        default: 0
    },
    public_id: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('NftAsset', AssetSchema)