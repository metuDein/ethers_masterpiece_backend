const NftAssets = require('../../model/NftAssets')
const NftCollections = require('../../model/NftCollections')
const Users = require('../../model/AppUsers')


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

module.exports = {
    getAllCollections,
    getAllAssets,
    getAllUsers
}