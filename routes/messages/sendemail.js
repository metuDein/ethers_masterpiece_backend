const express = require('express')
const sendEmail = require('../../controller/mailer/mailer')
const router = express.Router()


router.route('/')
    .post(sendEmail)


module.exports = router