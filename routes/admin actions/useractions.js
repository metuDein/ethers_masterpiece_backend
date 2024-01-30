const express = require('express')
const { updateUser, deleteUser } = require('../../controller/admin/userEditController')
const router = express.Router()


router.route('/')
    .patch(updateUser)
    .post(deleteUser)


module.exports = router