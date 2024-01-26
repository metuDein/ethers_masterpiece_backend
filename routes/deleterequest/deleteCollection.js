const express = require('express')
const { deleteCollection } = require('../../controller/actions/collectionController')
const router = express.Router()

router.route('/')
    .post(deleteCollection)


module.exports = router