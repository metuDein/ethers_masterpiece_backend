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


const updateAsset = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const asset = await NftAsset.findOne({ _id }).exec()
    if (!asset) return res.sendStatus(204)

    if (req.body?.name) asset.name = req.body.name
    if (req.body?.description) asset.description = req.body.description
    if (req.body?.supply) asset.supply = req.body.supply
    if (req.body?.price) asset.price = req.body.price
    if (req.body?.likes) asset.likes = req.body.likes
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


module.exports = updateAsset