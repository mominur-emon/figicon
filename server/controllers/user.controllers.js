const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      name: req.body.name,
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
            expiresIn: "1d",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "Login successful!",
          user_id: user[0]._id,
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
//put-> update user (/api/users/profile/:id)
const updateUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      return res.status(400).send("Incomplete data for user update.");
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,

      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true }
    );

    if (!user) return res.status(400).send("the user cannot be updated!");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete-> delete single user by id (/api/users/profile/:id)
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

//get-> get single user (/api/users/profile/:id)
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

// post-> post forget password (/api/users/forget)
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/api/users/reset/${oldUser._id}/${token}`;
    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mominur.emon195@gmail.com",
        pass: "rxyusdnpumwkahlj",
      },
    });

    await transporter.sendMail({
      to: oldUser.email,
      subject: "Password Reset",
      html: `Click <a href="${link}">here</a> to reset your password.`,
    });

    console.log(link);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// post-> post reset password (/api/users/reset/:id/:token)
const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.status(200).json({ message: "password reset success" });
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
  updateUser,
  forgetPassword,
  resetPassword,
};
