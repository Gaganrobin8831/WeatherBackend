import dotenv from 'dotenv';
dotenv.config();


import JWT from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;
console.log(secretKey);

export const createToken = (user) => {
  return JWT.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: '3h',
  });
}   

export const verifyToken = (token) => {
  try {
    return JWT.verify(token, secretKey);
  } catch (error) {
    console.log(error);
    
    return null;
  } 
}