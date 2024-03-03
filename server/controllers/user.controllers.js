const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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
            expiresIn: "8h",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          error: "Authetication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authetication failed!",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authetication failed!",
    });
  }
};

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

module.exports = { getAllUserProfile, registerUser, loginUser };
