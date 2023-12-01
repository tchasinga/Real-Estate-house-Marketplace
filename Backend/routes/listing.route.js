const express = require('express');
const createListing = require('../controller/listing.controller.js');
const router = express.Router();

// Adding a new listing of the objects in the database by routing 
router.post('/creating' , createListing);

module.exports = router;