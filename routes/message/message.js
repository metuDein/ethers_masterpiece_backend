const express = require('express')
const { getAllMessages, sendMessage, updateMessage } = require('../../controller/user actions/support and verification/supportRequestController')
const router = express.Router()

router.route('/')
    .get(getAllMessages)
    .post(sendMessage)
    .patch(updateMessage)


module.exports = router