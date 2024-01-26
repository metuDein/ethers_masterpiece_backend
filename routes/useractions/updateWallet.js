const express = require('express')
const { updateWallet } = require('../../controller/user actions/userEditController')
const router = express.Router()

router.route('/')
    .patch(updateWallet)

module.exports = router