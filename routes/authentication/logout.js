const express = require('express')
const router = express.Router()
const logOutController = require('../../controller/authentication/logOutController')

router.get('/', logOutController)

module.exports = router