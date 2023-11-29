const  express = require('express');
const { signup } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup) 

module.exports = signup;