const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = (req, res) => {
  res.status(200).json({
    message: "user is login",
  });
};

const getUserProfile = async (req, res) => {
  res.status(200).json({
    message: "user profile",
  });
};

module.exports = { getUserProfile, registerUser, loginUser };
