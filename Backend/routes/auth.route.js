// auth.router.js
const express = require('express');
const { signup, getUsers, singin, google , signout } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/singin', singin)
router.post('/google', google);
router.get('/signout', signout)
router.get('/', getUsers);

module.exports = router;
  