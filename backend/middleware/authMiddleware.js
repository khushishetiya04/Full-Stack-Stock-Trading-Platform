const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded.userId !== "string" || !decoded.userId.trim()) {
      return res.status(401).json({
        message: "Invalid or expired token. Please log in again.",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

module.exports = authMiddleware;
