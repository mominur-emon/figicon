const express = require("express");
const router = express.Router();

const {
  getAllIcons,
  getSingleIcon,
  uploadIcon,
  updateIcon,
  deleteIcon,
} = require("../controllers/icon.controllers");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", getAllIcons);
router.get("/:_id", getSingleIcon);
router.post("/", authMiddleware, adminMiddleware, uploadIcon);
router.put("/:_id", authMiddleware, adminMiddleware, updateIcon);
router.delete("/:_id", authMiddleware, adminMiddleware, deleteIcon);

module.exports = router;
