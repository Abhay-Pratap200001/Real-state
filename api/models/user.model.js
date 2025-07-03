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
      default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740"
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema); //making usermodel

export default User;