const express = require('express')
const { deleteFromCart } = require('../../controller/user actions/cartController')
const router = express.Router()

router.route('/')
    .post(deleteFromCart)
module.exports = router