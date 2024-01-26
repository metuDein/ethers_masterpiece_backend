const express = require('express')
const router = express.Router()
const refreshTokenContoller = require('../../controller/authentication/refreshTokenController')

router.get('/', refreshTokenContoller)

module.exports = router