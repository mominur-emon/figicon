const express = require("express");
const router = express.Router();

const {
  getAllIcons,
  getSingleIcon,
  uploadIcon,
  updateIcon,
  deleteIcon,
} = require("../controllers/icon.controllers");

router.get("/", getAllIcons);
router.get("/:_id", getSingleIcon);
router.post("/", uploadIcon);
router.put("/:_id", updateIcon);
router.delete("/:_id", deleteIcon);

module.exports = router;
