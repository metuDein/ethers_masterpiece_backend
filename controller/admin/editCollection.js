const NftCollection = require('../../model/NftCollections');
const NftAsset = require('../../model/NftAssets');
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



const updateCollection = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const collection = await NftCollection.findOne({ _id }).exec()
    if (!collection) return res.sendStatus(204).json({ mesasge: 'no collection found.' })

    if (req.body?.name) collection.name = req.body.name
    if (req.body?.network) collection.network = req.body.network
    if (req.body?.gasfeeamount) collection.gasfeeamount = req.body.gasfeeamount
    if (req.body?.image) {
        let uploadImage
        let uniqueID = Date.now()
        await cloudinary.uploader
            .destroy(
                [collection.public_id],
                { type: 'upload', resource_type: 'image' }
            ).then(result => console.log(result))

        await cloudinary.uploader.upload(
            req.body?.image,
            { public_id: uniqueID },
            function (error, result) {
                uploadImage = result.url
                if (!uploadImage) return res.status(507).json({ message: 'upload failed : insuficient space.' })
            })

        collection.banner = uploadImage
        collection.public_id = uniqueID
    }
    await collection.save()
    res.status(200).json({ collection })

}

module.exports = updateCollection