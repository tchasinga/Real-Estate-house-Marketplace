const jwt = require("jsonwebtoken");
const errorhandler = require("./error");
require('dotenv').config();

const verifyUser = (req,res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorhandler(401, "You need to be authentiqued"));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, "Token is not valid"));
        req.user = user;
        next();
    });
};

module.exports = verifyUser;