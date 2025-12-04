const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { generateToken, verifyToken, protect };