// IN MEMORY 
const cartDatabase = {};

module.exports.createCartId = (cartId) => {
  cartDatabase[cartId] = [];
  return cartId;
};

module.exports.addToCart = (cartId, product) => {
  return this.updateItem(cartId, product, 1);
};

module.exports.removeFromCart = (cartId, product) => {
  this.updateItem(cartId, product, -1);
};

module.exports.clearCart = (cartId) => {
  cartDatabase[cartId] = [];
};

module.exports.getCart = (cartId) => {
  return cartDatabase[cartId];
};

module.exports.getCart = (cartId) => {
  return cartDatabase[cartId];
};

module.exports.updateItem = (cartId, product, change) => {
  if (!cartId) throw Error;
  const items = cartDatabase[cartId];
  if (!items) {
    this.createCartId(cartId)
  }
  const itemIndex = items && items.length > 0 ? items.findIndex((item) => item.name == product.name) : -1;
  if (itemIndex > -1) {
    cartDatabase[cartId][itemIndex]["quantity"] += change;

    if (cartDatabase[cartId][itemIndex]["quantity"] == 0) {
      delete cartDatabase[cartId][itemIndex];
    }
  } else {
    cartDatabase[cartId].push({ ...product, quantity: change });
  }
  return true;
};
