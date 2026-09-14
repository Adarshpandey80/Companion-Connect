const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Read token from Authorization header first, then fall back to httpOnly cookie
  const authHeader = req.headers.authorization;
  const token =
    (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null) ||
    req.cookies?.token ||
    null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in to proceed.',
      isAuthError: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      ...decoded,
      userId: decoded.userId || decoded.id,
      id: decoded.userId || decoded.id,
    };
    next();
  } catch (err) {
    console.error('Authentication verification failed:', err.name);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
      isAuthError: true,
    });
  }
};

module.exports = { authenticateToken };
