// middleware/auth.js
const authenticateUser = require('../utils/authHelper');


const authMiddleware = async (req, res, next) => {
  const user = await authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;

