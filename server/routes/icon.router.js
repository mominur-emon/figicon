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
router.get("/:id", getSingleIcon);
router.post("/", authMiddleware, adminMiddleware, uploadIcon);
router.put("/:id", authMiddleware, adminMiddleware, updateIcon);
router.delete("/:id", authMiddleware, adminMiddleware, deleteIcon);

module.exports = router;
