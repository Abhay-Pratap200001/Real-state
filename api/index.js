import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);//update/delete
app.use('/api/auth' , authRouter)//signup/api/singin/api
app.use('/api/listing',listingRouter)


app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})



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