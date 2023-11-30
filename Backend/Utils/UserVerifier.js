const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyUser = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(403).send({message: "No token provided!"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.user = user;
        next();
    });
} 

module.exports = verifyUser;