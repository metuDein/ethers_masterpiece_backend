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

const uniqueID = Date.now()

const createCollection = async (req, res) => {
    const { name, banner, owner, network } = req.body

    if (!name || !banner || !owner || !network) return res.status(400).json({ mesasge: 'all fields are required.' })

    const duplicate = await NftCollection.findOne({ name }).exec()

    if (!duplicate) {
        const uniqueID = Date.now()

        let image
        await cloudinary.uploader.upload(
            banner,
            { public_id: uniqueID },
            function (error, result) {
                image = result?.url
                if (!image) return res.status(507).json({ message: 'upload failed : insuficient space.' })
            })
        if (!owner) {
            const result = await NftCollection.create({ name: name, banner: image, network: network, public_id: uniqueID })
            res.status(201).json({ result, message: "Your collection has been created." })
        } else {
            const result = await NftCollection.create({ name: name, banner: image, owner: owner, network: network, public_id: uniqueID })
            res.status(201).json({ result, message: "Your collection has been created." })
        }
    } else {
        return res.status(409).json({ message: 'this collection already exists.' })
    }

}
const updateCollection = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const collection = await NftCollection.findOne({ _id }).exec()
    if (!collection) return res.sendStatus(204).json({ mesasge: 'no collection found.' })

    if (req.body?.name) collection.name = req.body.name
    if (req.body?.network) collection.network = req.body.network
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

const deleteCollection = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })

    const foundCollection = await NftCollection.findOne({ _id }).exec()
    if (!foundCollection) return res.sendStatus(204)

    const collectionAssets = await NftAsset.find({ collectionName: foundCollection.name })

    if (collectionAssets) {
        try {


            let deleteImages = []
            deleteImages.push((foundCollection.public_id).toString())

            await collectionAssets.forEach(element => {
                deleteImages.push((element?.public_id).toString())
                console.log(deleteImages)
            });


            await cloudinary.api.delete_resources(deleteImages,
                { type: 'upload', resource_type: 'image' }
            ).then(result => console.log(result, deleteImages))

            await foundCollection.deleteOne()
            await NftAsset.deleteMany({
                collectionName: foundCollection.name
            })
            return res.json({ message: 'collection and assets deleted' })
        } catch (error) {
            console.error(error)
        }
    } else {
        await cloudinary.uploader
            .destroy(
                [(foundCollection.public_id).toString()],
                { type: 'upload', resource_type: 'image' }
            ).then(result => console.log(result))
        await foundCollection.deleteOne()
        res.status(200).json({ message: 'collection and assets deleted' })
    }
}

module.exports = {
    createCollection,
    updateCollection,
    deleteCollection
}