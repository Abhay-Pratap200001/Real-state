import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createListing,  deleteListing} from '../controllers/listing.controller.js';
 export const route = express.Router();

route.post("/create", verifyToken, createListing)
route.delete("/delete/:id", verifyToken, deleteListing)


export default route