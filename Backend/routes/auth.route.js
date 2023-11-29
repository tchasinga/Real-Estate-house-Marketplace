// auth.router.js
const express = require('express');
const { signup, getUsers, singin } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/singin', singin)
router.get('/', getUsers);

module.exports = router;
