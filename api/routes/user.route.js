import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser);  //before verifing userid updateUser route do not run




export default router;//4/12