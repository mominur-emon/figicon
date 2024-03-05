const express = require("express");
const {
  getAllUserProfile,
  loginUser,
  registerUser,
  getSingleUser,
} = require("../controllers/user.controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, adminMiddleware, getAllUserProfile);
router.get("/profile/:_id", authMiddleware, getSingleUser);

module.exports = router;
