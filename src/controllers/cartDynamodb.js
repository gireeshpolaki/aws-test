
// USING DYNAMO DB
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = process.env.TABLE_NAME;

module.exports.getCart = async (req, res) => {

  const params = {
    TableName: dynamodbTableName,
    Key: {
      cartID: req.query.cartId,
    },
  };
  await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {

        let cart = response?.Item?.items;
        let total = 0;
        if (cart && cart.length > 0) {
          cart.forEach((item) => {
            total += item.price * item.quantity;
          });
        }

        res.json({
          total,
          items: cart || [],
        });
      },
      (error) => {
        console.error("Error in GET CART: ", error);
        res.status(500).send(error);
      }
    );
};

module.exports.addItemToCart = async (req, res) => {
  const getparams = {
    TableName: dynamodbTableName,
    Key: {
      cartID: req.query.cartId,
    },
  };

  let cartItems = [];
  await dynamodb
    .get(getparams)
    .promise()
    .then((response) => {
      
      if (
        response &&
        response?.Item?.items?.length &&
        response.Item.items.length > 0
      ) {
        cartItems = response.Item.items;
      }
    });

  if (cartItems.length > 0) {
    const itemIndex = cartItems.findIndex((item) => item.name == req.body.name);
    if (itemIndex > -1) {
      cartItems[itemIndex]["quantity"]++;
    } else {
        cartItems.push({ ...req.body, quantity: 1 })
    }
  }

  const params = {
    TableName: dynamodbTableName,
    Item: {
      cartID: req.query.cartId,
      items: cartItems.length > 0 ? cartItems : [{ ...req.body, quantity: 1 }],
    },
  };

  await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          item: req.body,
        };
        res.json(body);
      },
      (error) => {
        console.error("Error in POST ITEM: ", error);
        res.status(500).send(error);
      }
    );
};
