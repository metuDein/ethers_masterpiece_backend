const express = require('express')
const { createCollection, updateCollection } = require('../../controller/actions/collectionController')
const { getAllCollections } = require('../../controller/frontend/getController')
const router = express.Router()

router.route('/')
    .get(getAllCollections)
    .post(createCollection)
    .patch(updateCollection)

module.exports = router