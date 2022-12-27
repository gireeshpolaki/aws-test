const express = require('express');
const apiRouter = express.Router();

const { cart } = require('./cart')
const { jwt, verifyUser } = require('./jwt')

apiRouter.use('/cart', verifyUser,  cart);
apiRouter.use('/user', jwt);

module.exports = { apiRouter }