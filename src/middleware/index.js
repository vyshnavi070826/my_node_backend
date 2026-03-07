const User = require("../models/User");

// Middleware to verify user from request (can be extended with JWT)
const verifyUser = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyUser
};