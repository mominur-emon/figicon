const express = require("express");
const {
  getAllUserProfile,
  loginUser,
  registerUser,
  getSingleUser,
  deleteUser,
  updateUser,
  resetPassword,
  forgetPassword,
  logoutUser,
} = require("../controllers/user.controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/profile", authMiddleware, adminMiddleware, getAllUserProfile);
router.get("/profile/:id", authMiddleware, getSingleUser);
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forget", forgetPassword);
router.post("/reset/:id/:token", resetPassword);
router.put("/profile/:id", authMiddleware, updateUser);
router.delete("/profile/:id", authMiddleware, deleteUser);

module.exports = router;
