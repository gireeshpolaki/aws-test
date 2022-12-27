# CART API

Cart API is build using NodeJS and Dynamo DB. This API has been deployed on AWS Elastic Bean Stack
API_Endpoint_URL: http://cartapi-env.eba-ccr3vuer.us-east-1.elasticbeanstalk.com/

## Installation

NodeJS is requrired

```bash
npm install
```

Add a .env file with the below properties

```bash
PORT
JWT_SECRET_KEY
```

To start the application
```bash
npm start
```

## Usage

1. GET JWT TOKEN 
```curl
POST {API_Endpoint_URL}/api/user/generateToken
```

input payload
```json
{
  username: "string"
}
```

returns
```json
{
  token: "xxxx"
}
```

2. Add Item to Cart

```curl 
POST {API_Endpoint_URL}/api/cart/additem/
```
```curl
Authorization using Bearer Token received from get token api
````

input payload
```json
{
  name: "string",
  price: number
}
```

returns
```json
{
    "Operation": "SAVE",
    "Message": "SUCCESS",
    "item": {
        "name": "apple",
        "price": 21
    }
}
```

3. GET Cart

```curl
Authorization using Bearer Token received from get token api
````

```curl 
GET {API_Endpoint_URL}/api/cart
```

returns
```json
{
    "total": 230,
    "items": [
        {
            "name": "apple",
            "price": 20,
            "quantity": 1
        },
        {
            "name": "mango",
            "price": 210,
            "quantity": 1
        }
    ]
}
```
## Deploying on AWS
1. create a AWS Elastic Beanstalk app with an app name (currently configured in us-east-1)
2. Upload the code via CI with github or zip file upload
3. Add the env variable like PORT, JWT_SECRET_KEY, AWS_REGION and TABLE_NAME
4. create a table called "Cart" in dyanamo db with primary key as "cartID"
5. edit the IAM instance profile of AWS Elastic Beanstalk and attach policy to grant AmazonDynamoDBFullAccess, so that Elastic Beanstalk can talk to dynamodb without any configuration.

## Deployed AWS Images
1. Elastic Beanstalk deployment
![API](https://github.com/gireeshpolaki/aws-test/blob/main/public/beanstalk.png?raw=true)
2. AWS DynamoDB table
![Cart table](https://github.com/gireeshpolaki/aws-test/blob/main/public/dynamodb-table.png?raw=true)
3. AWS DynamoDB table items
![table items](https://github.com/gireeshpolaki/aws-test/blob/main/public/table-items.png?raw=true)

## This code still have the in memory apis
POST {API_Endpoint_URL}/api/cart/in/additem/

GET {API_Endpoint_URL}/api/cart/in

## Contributing

## License

[MIT](https://choosealicense.com/licenses/mit/)