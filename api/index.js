import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    
  });const app = express()

app.listen(3000, ()=>{
    console.log("runiun");
    
})

//