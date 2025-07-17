import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,  deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';

const router = express.Router();

router.post("/create", verifyToken, createListing)//crete listing route
router.delete("/delete/:id", verifyToken, deleteListing)// delete listing route
router.post("/update/:id", verifyToken, updateListing)// update listing route only authorized user valid
router.get("/get/:id",  getListing)// get single listing according to id
router.get("/get", getListings)

export default router