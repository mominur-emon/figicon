const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      res.status(401).json({
        error: "Authentication failure! No token found.",
      });
    }

    const tokenCookie = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("jwt="));

    if (!tokenCookie) {
      res.status(401).json({
        error: "Authentication failure! No token found.",
      });
    }

    const token = tokenCookie.split("=")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        error: "Admin required.",
      });
    }
  } catch (err) {
    next("Authentication failure!");
  }
};

module.exports = adminMiddleware;
