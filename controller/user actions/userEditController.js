const Users = require('../../model/AppUsers')
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

const userEdits = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ mesasge: 'id required.' })


    const foundUser = await Users.findOne({ _id: _id }).exec()
    if (!foundUser) return res.sendStatus(204)

    try {
        if (req.body?.name) foundUser.name = req.body.name
        if (req.body?.username) foundUser.username = req.body.username
        if (req.body?.email) foundUser.email = req.body.email
        if (req.body?.password) foundUser.password = req.body.password
        if (req.body?.image) {
            let uploadImage
            let uniqueID = Date.now()
            if (foundUser?.public_id) {

                await cloudinary.uploader
                    .destroy(
                        [foundUser.public_id],
                        { type: 'upload', resource_type: 'image' }
                    ).then(result => console.log(result))
            }

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
            res.json({ message: 'update successful' })
        }
        await foundUser.save()
        res.json({ foundUser })
    } catch (error) {
        console.log(error)
    }
}

const updateWallet = async (req, res) => {
    const { _id, walletAddress, privateKey } = req.body

    if (!_id) return res.status(400).json({ message: 'missing fields user ID' })
    if (!walletAddress || !privateKey) return res.status(400).json({ message: 'missing fields wallet and key' })

    const foundUser = await Users.findOne({ _id }).exec()

    if (!foundUser) return res.sendStatus(204)

    foundUser.walletAddress = walletAddress
    foundUser.privateKey = privateKey

    const result = await foundUser.save()

    if (!result) return res.status(403).json({ message: 'wallet update failed' })

    res.status(200).json({ result })
}

module.exports = {
    userEdits,
    updateWallet
}