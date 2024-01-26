const white_list = require('../config/white_list')


const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (white_list.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}
module.exports = credentials