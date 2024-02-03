const express = require('express')
const updateAsset = require('../../controller/admin/editAssets')

const router = express.Router()


router.route('/')
    .patch(updateAsset)

module.exports = router