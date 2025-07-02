import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
dotenv.config()
const app = express()
app.use(express.json())


//connecting server to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    
  });

app.listen(3000, ()=>{
    console.log("runiun");
})

app.use('/api/user', userRouter);
app.use('/api/auth' , authRouter)//signup/api/singin/api


//error middleware 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});