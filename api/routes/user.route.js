import express from 'express';
import { deleteUser,  test,  updateUser, getUserListings  } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser);  //before verifing userid updateUser route do not run
router.delete('/delete/:id',verifyToken, deleteUser); // delete route
router.get('/listings/:id',verifyToken, getUserListings); // delete route




export default router;