const express = require('express')
const { getAppdata } = require('../../controller/frontend/getController')
const router = express.Router()

router.get('/', getAppdata)

module.exports = router