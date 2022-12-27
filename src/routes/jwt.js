const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({ message: 'invalid request'}); //invalid request
            } else {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const verified = jwt.verify(authorization[1], jwtSecretKey);
                if(verified){
                    console.log(verified);
                    req.query.cartId = verified.username
                    next();
                } else{
                    // Access Denied
                    return res.status(401).send(error);
                }
            }
        } catch (err) {
            return res.status(403).send({ message: 'invalid token'}); //invalid token
        }
    } else {
        return res.status(401).send({ message: 'invalid request'});
    }
}

app.get("/validateToken", verifyUser);

app.post("/generateToken", (req, res) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        username: req.body.username
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    
    res.send({token});
});

module.exports =  { jwt: app, verifyUser }