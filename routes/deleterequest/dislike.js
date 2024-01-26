const express = require('express')
const { deleteLike } = require('../../controller/user actions/likescontroller')
const router = express.Router()

router.post('/', deleteLike)

module.exports = router