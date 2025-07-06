import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const test = (req,res) =>{
    res.json({
        message: "hello"
    })
}


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

