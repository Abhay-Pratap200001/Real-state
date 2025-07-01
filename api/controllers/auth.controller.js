import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"


export const signup = async(req,res) =>{//Creating user signup controller
const {username, email, password} = req.body;
const hashedPassword = bcryptjs.hashSync(password, 10);// encrypting the password
const newUser = new User({username, email, password: hashedPassword});
try {
    await newUser.save(); //saving the new user in database
    res.status(201).json('user Created check you database')  
} catch (error) {
   res.status(500).json("Dublicate user" + error.message) 
}  
}