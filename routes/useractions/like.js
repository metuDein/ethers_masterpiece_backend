const express = require('express')
const { createLike, getLikes } = require('../../controller/user actions/likescontroller')
const router = express.Router()

router.route('/')
    .get(getLikes)
    .post(createLike)
module.exports = router