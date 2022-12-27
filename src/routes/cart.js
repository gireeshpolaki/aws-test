const express = require('express');
const app = express.Router();

const { getCart, addItemToCart} = require('../controllers/index');
const { getCart : getCartDB, addItemToCart: addItemToCartDB } = require('../controllers/cartDynamodb');

// IN MEMORY
app.get('/in', getCart);
app.post('/in/additem', addItemToCart);

// USING DYNAMO DB
app.get('/', getCartDB);
app.post('/additem', addItemToCartDB);


module.exports =  { cart: app }