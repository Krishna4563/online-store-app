const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    // Get the Authorization header and replace "Bearer "
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Validate and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    // Attach user object to request
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
