const express = require('express')
const { getAllUsers } = require('../../controller/frontend/getController')
const router = express.Router()

router.get('/', getAllUsers)

module.exports = router