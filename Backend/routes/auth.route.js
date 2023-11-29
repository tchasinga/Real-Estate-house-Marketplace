// auth.router.js
const express = require('express');
const { signup, getUsers } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.get('/getUsers', getUsers);

module.exports = router;
