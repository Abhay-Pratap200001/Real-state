import express from 'express';
import {signin, signOut, signup} from '../controllers/auth.controller.js'; //exporting signup route

const router = express.Router();


router.post("/signup", signup); //signup route
router.post("/signin", signin); //signup route
router.get("/signout", signOut)

export default router
