const express = require("express");
const router = express.Router();

const { uploadIcon } = require("../controllers/icon.controllers");

router.post("/", uploadIcon);

module.exports = router;
