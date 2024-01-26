const express = require('express')
const { uploadImage, getImages } = require('../controller/actions/imagesController')
const router = express.Router()

router.route('/')
    .get(getImages)
    .post(uploadImage)

module.exports = router