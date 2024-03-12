const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
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
    const { email, userId } = decoded;
    req.email = email;
    req.userId = userId;
    next();
  } catch (err) {
    next("Authentication failure!");
  }
};

module.exports = authMiddleware;
