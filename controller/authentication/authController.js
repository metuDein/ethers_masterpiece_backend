const Users = require('../../model/AppUsers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authController = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(401).json({ message: 'please fill out all fields.' })

    const foundUser = await Users.findOne({ username: user }).exec()
    if (!foundUser) return res.status(404).json({ message: 'user has not been registered.' })

    if (foundUser.password === pwd) {
        const roles = Object.values(foundUser.roles).filter(Boolean)
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '5h' }
        )

        foundUser.refreshToken = refreshToken

        const result = await foundUser.save()
        if (!result) return res.status(400).json({ message: 'user authentication failed.' })
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ roles, accessToken })
    } else {
        return res.status(403).json({ message: 'incorrect password.' })
    }
}

module.exports = authController