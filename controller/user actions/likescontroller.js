const Likes = require('../../model/Likes')
const NftAsset = require('../../model/NftAssets')



const getLikes = async (req, res) => {
    const likes = await Likes.find()
    if (!likes) res.sendStatus(204)
    res.json(likes)
}

const createLike = async (req, res) => {
    const { owner, item } = req.body
    if (!owner || !item) return res.status(400).json({ message: 'missing fields.' })

    const asset = await NftAsset.findOne({ _id: item }).exec()
    if (!asset) return res.sendStatus(400)

    asset.likes = asset.likes + 1

    await asset.save()
    // const duplicate = await Likes.findOne({ owner }).exec()

    // if (duplicate) return res.status(409).json({ message: ' already liked.' })


    const newLike = await Likes.create({ owner, item })

    if (!newLike) return res.status(401).json({ message: 'action failed.' })

    res.json(newLike)
}

const deleteLike = async (req, res) => {
    const { _id, item } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field ID.' })

    const like = await Likes.findOne({ _id }).exec()
    if (!like) return res.sendStatus(400)

    const asset = await NftAsset.findOne({ _id: item }).exec()
    if (!asset) return res.sendStatus(400)

    asset.likes = asset.likes - 1

    await asset.save()

    await like.deleteOne()

    res.json({ message: 'disliked' })
}

module.exports = {
    getLikes,
    createLike,
    deleteLike
}