const express = require("express");
const router = express.Router();

const {
  getAllIcons,
  getSingleIcon,
  uploadIcon,
  updateIcon,
  deleteIcon,
  searchIcon,
} = require("../controllers/icon.controllers");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", getAllIcons);
router.get("/icon/:id", getSingleIcon);
router.get("/search", searchIcon);
router.post("/", authMiddleware, adminMiddleware, uploadIcon);
router.put("/icon/:id", authMiddleware, adminMiddleware, updateIcon);
router.delete("/icon/:id", authMiddleware, adminMiddleware, deleteIcon);

module.exports = router;
