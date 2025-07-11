import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,  deleteListing, updateListing,getListing} from '../controllers/listing.controller.js';
 export const route = express.Router();

route.post("/create", verifyToken, createListing)
route.delete("/delete/:id", verifyToken, deleteListing)
route.get("/get/:id",  getListing)
route.post("/update/:id", verifyToken, updateListing)




export default route