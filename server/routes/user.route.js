const express = require("express");
const {
  getAllUserProfile,
  loginUser,
  registerUser,
} = require("../controllers/user.controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getAllUserProfile);

module.exports = router;
