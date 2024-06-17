const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const authenticateUser = async (req) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user || null;
  } catch (error) {
    return null;
  }
};

module.exports = authenticateUser;

