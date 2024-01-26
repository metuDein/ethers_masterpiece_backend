const NftAsset = require('../../model/NftAssets')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
}

const createAsset = async (req, res) => {
    const { name, owner, collectionName, image, description, network, supply, price, category } = req.body

    if (!name || !owner || !collectionName || !image || !network) return res.status(400).json({ message: 'missing fields.' })

    const duplicate = await NftAsset.findOne({ name }).exec()

    if (!duplicate) {
        let uploadImg
        const uniqueID = Date.now()
        await cloudinary.uploader.upload(
            image,
            { public_id: uniqueID },
            function (error, result) {
                uploadImg = result.url
                if (!uploadImg) return res.status(507).json({ message: 'upload failed : insuficient space.' })
            })

        const newAsset = await NftAsset.create({ name, owner, collectionName, image: uploadImg, description, network, supply, price, category, public_id: uniqueID })

        if (!newAsset) return res.status(400).json({ message: 'asset creation failed.' })

        res.status(201).json({ message: 'asset created.', newAsset })

    } else {
        return res.status(409).json({ message: 'This asset already exist on the app.' })
    }
}

const updateAsset = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const asset = await NftAsset.findOne({ _id }).exec()
    if (!asset) return res.sendStatus(204)

    if (req.body?.name) asset.name = req.body.name
    if (req.body?.description) asset.description = req.body.description
    if (req.body?.supply) asset.supply = req.body.supply
    if (req.body?.price) asset.price = req.body.price
    if (req.body?.image) {
        let uploadImage
        let uniqueID = Date.now()
        await cloudinary.uploader
            .destroy(
                [asset.public_id],
                { type: 'upload', resource_type: 'image' }
            ).then(result => console.log(result))

        await cloudinary.uploader.upload(
            req.body?.image,
            { public_id: uniqueID },
            function (error, result) {
                uploadImage = result.url
                if (!uploadImage) return res.status(507).json({ message: 'upload failed : insuficient space.' })
            })

        asset.image = uploadImage
        asset.public_id = uniqueID
        await asset.save()

    }
    await asset.save()
    res.status(200).json({ asset })

}

const deleteAsset = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const foundAsset = await NftAsset.findOne({ _id }).exec()
    if (!foundAsset) return res.sendStatus(204).json({ mesasge: 'no asset found.' })

    await cloudinary.uploader
        .destroy(
            [foundAsset.public_id],
            { type: 'upload', resource_type: 'image' }
        ).then(result => console.log(result))

    await foundAsset.deleteOne()
    res.status(200).json({ message: 'asset deleted' })
}

module.exports = {
    createAsset,
    updateAsset,
    deleteAsset
}