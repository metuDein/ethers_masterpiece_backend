const Users = require('../../model/AppUsers')

const logOutController = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'please login' })

    const refreshToken = cookies.jwt
    const foundUser = await Users.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204).json({ message: 'no user found' })
    }

    foundUser.refreshToken = ''
    await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
    return res.status(200).json({ message: 'logged out.' })

}

module.exports = logOutController