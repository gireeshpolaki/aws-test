const { validateProduct } = require('../validations');
const { getCart, addToCart } = require('./cart');

module.exports.getCart = (req, res) => {
    try {
        let cartId = req.query.cartId;
        const cart = getCart(cartId);
        let total = 0;
        if (cart && cart.length > 0) {
            cart.forEach(item => {
                total += item.price * item.quantity
            });
        }
    
        res.send({
            total, items: cart || []
        })
    } catch (error) {
        res.status(400).send({
            'success': false,
            "error": error.message
        })
    }
}

module.exports.addItemToCart = (req, res) => {
    try {
        const item = req.body;
        const valid = validateProduct(item);
        if (!valid) throw Error(validateProduct.errors[0]?.message);
        const cartId = req.query.cartId ;
        const cart = addToCart(cartId, item);
        if (cart) {
            res.send({
                'success': true,
                "message": `Added Item to your cart ${cartId}`
            })
        } else {
            throw Error('Error adding Items to Cart')
        }
    } catch (error) {
        res.status(400).send({
            'success': false,
            "error": error.message
        })
    }
}