const express = require('express')
const { getAllCartItems, addToCart } = require('../../controller/user actions/cartController')
const router = express.Router()

router.route('/')
    .get(getAllCartItems)
    .post(addToCart)
module.exports = router