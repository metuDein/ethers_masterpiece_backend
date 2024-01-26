const express = require('express')
const { deleteMessage } = require('../../controller/user actions/support and verification/supportRequestController')
const router = express.Router()

router.route('/')
    .post(deleteMessage)


module.exports = router