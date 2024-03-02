const express = require("express");
const { getUserProfile, loginUser, registerUser } = require("../controllers/user.controllers");
const router = express.Router();



router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/profile",getUserProfile )

module.exports = router;