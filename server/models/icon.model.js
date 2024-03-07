const mongoose = require("mongoose");

const iconSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconLink: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },

    lanes: {
      type: String,
      enum: ["line", "solid"],
    },
    shape: {
      type: String,
      enum: ["rounded", "square"],
    },
    pro: {
      type: Boolean,
      default: false,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Icons", iconSchema);
