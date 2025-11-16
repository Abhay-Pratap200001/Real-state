import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) =>{
    res.json({
        message: "hello"
    })
}

//User profile section after singing user can see this section
export const updateUser = async (req, res, next) => {  //user updated function
  if (req.user.id !== req.params.id) //checking loggedin user and the user req is same if it only that poin we give access to update 

    return next(errorHandler(401, 'You can only update your own account!'));

  try {
    if (req.body.password) { // if user want to update do it
      req.body.password = bcryptjs.hashSync(req.body.password, 10);// hash the new password for safety
    }

    const updatedUser = await User.findByIdAndUpdate(// updating the user field by user id
      req.params.id, // update only those fiels which comes from body
      {
        $set: {
          username: req.body.username,//update username
          email: req.body.email,//update email
          password: req.body.password,//pass
          avatar: req.body.avatar,//profile img
        },
      },
      { new: true }// its return new updated data 
    );

    const { password, ...rest } = updatedUser._doc;// hiding the user password before sending it to client

    res.status(200).json(rest);// sending 200 res 
  } catch (error) {
    next(error);// if any error thor it to error middleware
  }
};



export const deleteUser = async (req, res, next) => { // deleting user function
  if (req.user.id !== req.params.id)// comparing exesting user to user which come from client 
    return next(errorHandler(401, 'You can only delete your own account!'));//show erro 
  try {
    await User.findByIdAndDelete(req.params.id);// find user which come and delete it 
    res.clearCookie('access_token');// clear cookie
    res.status(200).json('User has been deleted!'); // send respose
  } catch (error) {
    next(error);// error the pass to next
  }
};




export const getUserListings = async (req, res, next) => { //getting user listing function
   if (req.user.id === req.params.id) { // if the user listing id and the authenticated user id is same find listing from db
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
}


export const getUser = async (req, res, next) => {//getting user info based on id
  try {
       const user = await User.findById(req.params.id);
       if (!user) return next(errorHandler(404, 'User not found!'));
        const { password: pass, ...rest } = user._doc; // dont send pass 
        res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};