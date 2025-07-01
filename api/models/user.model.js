import mongoose from 'mongoose';

//Making userschema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema); //making usermodel

export default User;