import express from 'express';
import { deleteUser,  test,  updateUser, getUserListings, getUser  } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser);  //before verifing userid updateUser route do not run
router.delete('/delete/:id',verifyToken, deleteUser); // delete route
router.get('/listings/:id',verifyToken, getUserListings);// lsiting route
router.get('/:id',verifyToken, getUser); // getting user info





export default router;