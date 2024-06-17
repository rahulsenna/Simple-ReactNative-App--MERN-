// middleware/optionalAuth.js
const authenticateUser = require('../utils/authHelper');

const optionalAuthMiddleware = async (req, res, next) => {
  req.user = await authenticateUser(req);
  next();
};

module.exports = optionalAuthMiddleware;

