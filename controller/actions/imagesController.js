const Images = require('../../model/Images');
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

const uniqueID = Date.now()

const getImages = async (req, res) => {
    const images = await Images.find()
    if (!images) return res.sendStatus(204).json({ message: 'no Images.' })
    res.status(200).json({ images })

}

const uploadImage = async (req, res) => {
    const { banner } = req.body
    if (!banner) return res.status(400).json({ message: 'missing' })

    let image
    await cloudinary.uploader.upload(
        banner,
        { public_id: uniqueID },
        function (error, result) {
            image = result.url
            if (!image) return res.status(507).json({ message: 'upload failed : insuficient space.' })
        })
    const result = await Images.create({ url: image, public_id: uniqueID })
    if (!result) return res.status(400).json({ message: 'upload failed' })
    res.status(200).json({ message: 'image created' })
}

const deleteImage = async (req, res) => {
    const { image_id, public_id } = req.body
    if (!image_id || !public_id) return res.status(400).json({ message: 'missing fields' })

    const image = await Images.findOne({ _id: image_id }).exec()

    cloudinary.uploader.destroy
        ([public_id],
            { type: 'upload', resource_type: 'image' })
        .then((result) => console.log(result));

    const result = await image.deleteOne()

    if (!result) return res.status(401).json({ message: ' delete failed' })
    res.status(200).json({ message: 'item deleted' })
}

module.exports = {
    getImages,
    uploadImage,
    deleteImage
}