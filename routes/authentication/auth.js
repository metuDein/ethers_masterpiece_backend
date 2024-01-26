const express = require('express')
const router = express.Router()
const authController = require('../../controller/authentication/authController')

router.post('/', authController)

module.exports = router