const express = require('express')
// const { updateUser, deleteUser } = require('../../controller/admin/userEditController')
const updateCollection = require('../../controller/admin/editCollection')

const router = express.Router()


router.route('/')
    .patch(updateCollection)

module.exports = router