import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};


export const deleteListing = async (req, res, next) => { // delet listing function
  const listing = await Listing.findById(req.params.id);// finding user by user_id which is save in db

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));// if not find then give error
  }

  if (req.user.id !== listing.userRef){// is user current is is not same to the user who want to delete  the listing give error 
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id); // find listing and delete it
    res.status(200).json('Listing has been deleted!'); //send res to client
  } catch (error) {
    next(error);
  }
};


export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};