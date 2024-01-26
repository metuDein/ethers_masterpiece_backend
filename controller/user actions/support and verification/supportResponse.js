const Messages = require('../../../model/Messages')



const getAllMessages = async (req, res) => {
    const messages = await Messages.find()
    if (!messages) return res.sendStatus(204)

    res.json(messages)
}

const sendMessage = async (req, res) => {
    const { sender, receiver, subject, description } = req.body

    if (!receiver || !subject || description) return res.status(400).json({ message: 'missing fields.' })


    if (sender) {
        const newMessage = await Messages.create({ sender, receiver, subject, description })
        if (!newMessage) return res.status(400).json({ message: 'Action Failed.' })
    }

    const newMessage = await Messages.create({ sender, receiver, subject, description })
    if (!newMessage) return res.status(400).json({ message: 'Action Failed.' })

    res.json({ message: 'success' })

}

const updateMessage = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field ID.' })

    const message = await Messages.findOne({ _id }).exec()
    if (!message) res.sendStatus(204)

    message.readMsg = true

    await message.save()
    res.json({ message: 'read' })
}

const deleteMessage = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field ID.' })

    const message = await Messages.findOne({ _id }).exec()
    if (!message) res.sendStatus(204)

    await message.deleteOne()

    res.json({ message: 'deleted.' })

}

module.exports = {
    getAllMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
}