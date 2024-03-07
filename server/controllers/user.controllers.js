const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//post-> register user (/api/users)
const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).json({
        error: "User already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//post-> login user (/api/users/login)
const loginUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authentication failed!",
    });
  }
};
//delete-> delete single user by id (/api/users/profile/:_id)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "The user is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "user not found!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get-> get all user profile (/api/users/profile)
const getAllUserProfile = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const userProfiles = users.map((user) => ({
      _id: user._id,
      email: user.email,
    }));

    res.status(200).json(userProfiles);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get-> get single user (/api/users/profile/:_id)
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res
        .status(500)
        .json({ message: "The user with the given ID was not found." });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUserProfile,
  registerUser,
  loginUser,
  deleteUser,
  getSingleUser,
};
