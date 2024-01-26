const express = require('express')
const { createAsset, updateAsset } = require('../../controller/actions/assetsController')
const { getAllAssets } = require('../../controller/frontend/getController')
const router = express.Router()

router.route('/')
    .get(getAllAssets)
    .post(createAsset)
    .patch(updateAsset)

module.exports = router