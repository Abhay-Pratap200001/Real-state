import express from 'express';
import {signup} from '../controllers/auth.controller.js'; //exporting signup route

const router = express.Router();


router.post("/signup", signup); //signup route

export default router
