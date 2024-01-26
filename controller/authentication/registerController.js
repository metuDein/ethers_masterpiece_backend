const Users = require('../../model/AppUsers')
const bcrypt = require('bcrypt')


const handleRegistration = async (req, res) => {
    const { name, user, pwd, email } = req.body
    if (!name || !user || !pwd || !email) return res.status(401).json({ message: 'please fill out all fields' })

    const duplicate = await Users.findOne({ username: user }).exec()

    if (!duplicate) {
        const hashedPwd = await bcrypt.hash(pwd, 10)
        try {
            const newUser = {
                name,
                username: user,
                password: pwd,
                email
            }
            const result = await Users.create(newUser);
            if (!result) return res.status(400).json({ message: 'Registration failed.' })
            res.status(201).json({ message: `user ${user} created.`, result })
        } catch (error) {
            console.log(error)
        }
    } else {
        return res.status(409).json({ message: 'duplicate user found.' })
    }
}

module.exports = handleRegistration