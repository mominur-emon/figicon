const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["pro", "free"],
      default: "free",
    },
    paymentType: {
      type: String,
      enum: ["yearly", "free", "lifetime"],
      default: "free",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
