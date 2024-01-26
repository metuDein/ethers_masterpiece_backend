const express = require('express')
const { deleteImage } = require('../../controller/actions/imagesController')
const router = express.Router()

router.post('/', deleteImage)

module.exports = router