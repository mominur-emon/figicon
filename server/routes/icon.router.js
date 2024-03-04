const express = require("express");
const router = express.Router();

const { uploadIcon, getAllIcons } = require("../controllers/icon.controllers");

router.post("/", uploadIcon);
router.get("/getallicons", getAllIcons);

module.exports = router;
