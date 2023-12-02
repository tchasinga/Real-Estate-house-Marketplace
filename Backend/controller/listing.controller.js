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


module.exports = {createListing, deleteListing}

