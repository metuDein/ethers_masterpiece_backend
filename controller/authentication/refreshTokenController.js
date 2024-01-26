const Users = require('../../model/AppUsers')
const jwt = require('jsonwebtoken')


const refreshTokenContoller = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'please login' })

    const refreshToken = cookies.jwt
    const foundUser = await Users.findOne({ refreshToken }).exec()

    if (!foundUser) return res.status(404).json({ message: 'no user found' })
    const user = foundUser.username
    const pwd = foundUser.password

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.username !== foundUser.username) return res.status(403).json({ message: 'unauthorized access' })
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            )
            res.status(200).json({ user, pwd, roles, accessToken })
        }
    )
}

module.exports = refreshTokenContoller
