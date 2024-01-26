const express = require('express')
const { getAllUsers } = require('../../controller/frontend/getController')
const { userEdits } = require('../../controller/user actions/userEditController')
const router = express.Router()

router.route('/')
    .get(getAllUsers)
    .patch(userEdits)

module.exports = router