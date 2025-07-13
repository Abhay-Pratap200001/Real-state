import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,  deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';
 export const route = express.Router();

route.post("/create", verifyToken, createListing)//crete listing route
route.delete("/delete/:id", verifyToken, deleteListing)// delete listing route
route.post("/update/:id", verifyToken, updateListing)// update listing route only authorized user valid
route.get("/get/:id",  getListing)// get single listing according to id
route.post("/get", getListings)





export default route