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
const getListingdatabyid = async (req, res, next) => {
    try {
        const listings = await Listing.findById(req.params.id)
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}

// Public GET request for all USER to SEARCH AND FILTER DATA FROM API PUBLIC
const getAllListedDataFromListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;
        
        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = {$in: [false, true]};
        }
        
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = {$in: [false, true]};
        }
        
        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = {$in: [false, true]};
        }
        
        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = {$in: ['sale', 'rent']};
        }

       const searchTerm = req.query.searchTerm || '';
       const sort = req.query.sort || 'createdAt';
       const order = req.query.order || 'desc'; 

         const listings = await Listing.find({
              name: {$regex: searchTerm, $options: 'i'},
              offer,
              furnished,
              parking,
              type,
         }).sort({[sort]: order}).limit(limit).skip(startIndex).exec();
         return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}

module.exports = {createListing, deleteListing, updateListing, getListingdatabyid, getAllListedDataFromListing}

 