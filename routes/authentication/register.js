const express = require('express')
const router = express.Router()
const handleRegistration = require('../../controller/authentication/registerController')

router.post('/', handleRegistration)

module.exports = router