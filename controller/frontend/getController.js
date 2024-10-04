const NftAssets = require('../../model/NftAssets')
const NftCollections = require('../../model/NftCollections')
const Users = require('../../model/AppUsers')
const Likes = require('../../model/Likes')
const Cart = require('../../model/Cart')
const Message = require('../../model/Messages')


const getAllAssets = async (req, res) => {
    const assets = await NftAssets.find()
    if (!assets) return res.sendStatus(204).json({ message: 'no assets found' })

    res.status(200).json({ assets })
}
const getAllCollections = async (req, res) => {
    const collections = await NftCollections.find()
    if (!collections) return res.sendStatus(204).json({ message: 'no collections found' })

    res.status(200).json({ collections })
}

const getAllUsers = async (req, res) => {
    const users = await Users.find()
    if (!users) return res.sendStatus(204).json({ message: 'no users found' })

    res.status(200).json({ users })
}

const getAppdata = async (req, res) => {
    const collections = await NftCollections.find()
    const assets = await NftAssets.find()
    const users = await Users.find()
    const likes = await Likes.find()
    const cart = await Cart.find()
    const messages = await Message.find()

    res.status(200).json({ collections, assets, users, likes, cart, messages })
}

module.exports = {
    getAllCollections,
    getAllAssets,
    getAllUsers,
    getAppdata
}