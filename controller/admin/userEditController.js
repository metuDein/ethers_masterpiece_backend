const Users = require('../../model/AppUsers')
const NftColletion = require('../../model/NftCollections')
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



const updateUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field password.' })

    const foundUser = await Users.findOne({ _id }).exec()
    if (!foundUser) return res.sendStatus(204)

    try {
        if (req.body?.name) foundUser.name = req.body.name
        if (req.body?.username) foundUser.username = req.body.username
        if (req.body?.email) foundUser.email = req.body.email
        if (req.body?.password) foundUser.password = req.body.password
        if (req.body?.balance) foundUser.balance = req.body.balance
        if (req.body?.image) {
            let uploadImage
            let uniqueID = Date.now()
            await cloudinary.uploader
                .destroy(
                    [foundUser.public_id],
                    { type: 'upload', resource_type: 'image' }
                ).then(result => console.log(result))

            await cloudinary.uploader.upload(
                req.body?.image,
                { public_id: uniqueID },
                function (error, result) {
                    uploadImage = result.url
                    if (!uploadImage) return res.status(507).json({ message: 'upload failed : insuficient space.' })
                })

            foundUser.image = uploadImage
            foundUser.public_id = uniqueID
            await foundUser.save()
            res.json(foundUser)
        }
        await foundUser.save()
        res.json(foundUser)
    } catch (error) {
        console.log(error);
    }
}


const deleteUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field password.' })

    const foundUser = await Users.findOne({ _id }).exec()
    if (!foundUser) return res.sendStatus(204)

    const userCollections = await NftColletion.find({ owner: foundUser.username })
    const userAssets = await NftAsset.find({ owner: foundUser.username })


    if (userCollections) {
        let deleteImages = []

        await userCollections.forEach(element => {
            deleteImages.push((element?.public_id).toString())
            console.log(deleteImages)
        });

        await cloudinary.api.delete_resources(deleteImages,
            { type: 'upload', resource_type: 'image' }
        ).then(result => console.log(result, deleteImages))


        await NftColletion.deleteMany({
            owner: foundUser.username
        })
    }

    if (userAssets) {
        let deleteImages = []
        await userAssets.forEach(element => {
            deleteImages.push((element?.public_id).toString())
            console.log(deleteImages)
        });

        await NftAsset.deleteMany({
            owner: foundUser.username
        })
    }
    if (foundUser.public_id) {
        await cloudinary.uploader
            .destroy(
                [(foundUser.public_id).toString()],
                { type: 'upload', resource_type: 'image' }
            ).then(result => console.log(result))
    }

    await foundUser.deleteOne()

    res.json({ message: 'user and user\'s assets have been deleted.' })

}


module.exports = {
    updateUser,
    deleteUser
}