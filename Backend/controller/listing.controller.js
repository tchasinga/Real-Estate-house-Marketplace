const Listing = require("../model/listing.model.js");

// making a listing component....
const createListing = async (req, res, next) => {
    try {
      const listing = await Listing.create(req.body); 
      return res.status(201).json(listing) 
    } catch (error) {
        next(error);
    }
}

// deleting a listing component....
const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

// updating a listing component.... information
const updateListing = async (req, res, next) => {
    try {
         const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
         )
         res.status(200).json(updatedListing)
    } catch (error) {
        next(error); 
    }
}

// Public GET request for all USER IN THE WEB APP
const getAllListings = async (req, res, next) => {
    try {
        const listings = await Listing.findById(req.params.id)
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}


module.exports = {createListing, deleteListing, updateListing, getAllListings}

 