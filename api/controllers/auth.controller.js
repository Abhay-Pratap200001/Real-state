import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
