// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) return res.status(403).json({ message: "Access denied, no token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Extract user ID from token
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;
