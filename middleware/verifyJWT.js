const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => {
    const authHeaders = req.header.authorization || req.header.Authorization
    if (!authHeaders) return res.status(401).json({ message: 'unauthorized access.' })

    const token = authHeaders.split(' ')[1]

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: ' JWT failed - forbidden access.' })
            req.username = decoded.username
            req.roles = decoded.userInfo.roles
            next()
        }
    )

}

module.exports = verifyJWT