const Cart = require('../../model/Cart')

const getAllCartItems = async (req, res) => {
    const cartItems = await Cart.find()
    if (!cartItems) return res.sendStatus(204)

    res.json(cartItems)
}

const addToCart = async (req, res) => {
    const { owner, item } = req.body
    if (!owner || !item) return res.status(400).json({ message: 'missing fields.' })

    const duplicate = await Cart.findOne({ owner, item }).exec()

    if (duplicate) return res.status(409).json({ message: 'duplicate' })

    const newCartItem = await Cart.create({ owner, item })

    if (!newCartItem) return res.status(403).json({ message: 'Action failed.' })

    res.json(newCartItem)
}

const deleteFromCart = async (req, res) => {
    const { _id } = req.body
    if (!_id) return res.status(400).json({ message: 'missing field ID.' })

    const cartItem = await Cart.findOne({ _id }).exec()
    if (!cartItem) return res.sendStatus(204)

    await cartItem.deleteOne()

    res.json({ message: 'item removed' })
}


module.exports = {
    getAllCartItems,
    addToCart,
    deleteFromCart
}