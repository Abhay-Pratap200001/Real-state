import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  //Creating user signup controller
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // encrypting the password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save(); //saving the new user in database
    res.status(201).json("user Created check you database");
  } catch (error) {
    next(error); // using error handler from index.js
  }
};


export const signin = async (req, res, next) => { //signin function
  const { email, password } = req.body;// accepting email,pass from browser and destructuring it
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);// compare db saved pass and user login pass
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // generating jwt token and coverting user id to jwt id
    const { password: pass, ...rest } = validUser._doc;// storing password sapprate and store other field in rest obj 
    res
      .cookie('access_token', token,// sending cookies to frontend with the name of access_token
       { httpOnly: true })
      .status(200)
      .json(rest);// sending user info to frontend without pass
  } catch (error) {
    next(error);
  }
}; 



export const signOut = async (req, res, next) => { // signOut function 
  try {
    res.clearCookie('access_token'); // clear cooies which is store in frontend
    res.status(200).json('User has been logged out!'); // sending response
  } catch (error) {
    next(error);
  }
};
