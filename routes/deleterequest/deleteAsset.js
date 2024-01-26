const express = require('express')
const { deleteAsset } = require('../../controller/actions/assetsController')
const router = express.Router()

router.route('/')
    .post(deleteAsset)


module.exports = router