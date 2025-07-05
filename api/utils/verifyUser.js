import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {  //verifing token to check is user had a cookie-or not
  const token = req.cookies.access_token; //aacepting cookie-from frontend and storing to token variable 

  if (!token) return next(errorHandler(401, 'Unauthorized')); 

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //verifing the jwt.token is valid or not if then decoded it 
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
};