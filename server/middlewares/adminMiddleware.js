const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        error: "Admin reuired.",
      });
    }
  } catch (err) {
    next("Authentication failure!");
  }
};

module.exports = adminMiddleware;
