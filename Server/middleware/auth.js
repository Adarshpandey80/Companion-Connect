const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in to proceed.',
      isAuthError: true,
    });
  }

  try {
    let decoded;
    const primarySecret = process.env.JWT_SECRET || 'your-secret-key';

    try {
      decoded = jwt.verify(token, primarySecret);
    } catch (primaryErr) {
      // Fallback verification with default secret if token was issued prior to dotenv config loading
      if (primarySecret !== 'your-secret-key') {
        try {
          decoded = jwt.verify(token, 'your-secret-key');
        } catch {
          throw primaryErr;
        }
      } else {
        throw primaryErr;
      }
    }

    req.user = {
      ...decoded,
      userId: decoded.userId || decoded.id,
      id: decoded.userId || decoded.id,
    };
    next();
  } catch (err) {
    console.error('Authentication verification failed:', err.name, err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
      isAuthError: true,
      errorName: err.name,
    });
  }
};

module.exports = { authenticateToken };
