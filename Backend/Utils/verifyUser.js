const jwt = require('jsonwebtoken');
const errorhandler = require("./error");
require('dotenv').config();

// Add user verifier function
const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw errorhandler(401, "Unauthorized not here bro and you need to authorize first...");
    }
    try {
        const validUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyUser;
