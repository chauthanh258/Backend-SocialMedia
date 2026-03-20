const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    // In memory system, we just attach the decoded user info
    // Validation that user still exists would happen here if we had more complex requirements
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};

module.exports = authMiddleware;
