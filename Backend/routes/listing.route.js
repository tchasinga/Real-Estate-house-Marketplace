const express = require('express');
const {createListing, deleteListing, updateListing, getListingdatabyid, getAllListedDataFromListing} = require('../controller/listing.controller.js');
const router = express.Router();

// Adding a new listing of the objects in the database by routing 
router.post('/creating' , createListing);
router.delete('/delete/:id' , deleteListing);
router.post('/update/:id' , updateListing);
router.get('/get/:id', getListingdatabyid);
router.get('/gettingdata', getAllListedDataFromListing);


module.exports = router;