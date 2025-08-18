
import User from '../Models/user.Models.js';
import { verifyToken } from './Token.Middleware.js';
const secretKey = process.env.JWT_SECRET_KEY;

export const checkAuthentication = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    const userId = req.user.id;
    const userDetail = await User.findOne({ _id: userId });
    if (!userDetail) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
