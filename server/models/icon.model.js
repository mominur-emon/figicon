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

    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    lanes: {
      type: String,
      required: true,
      enum: ["line", "solid"],
    },
    shape: {
      type: String,
      required: true,
      enum: ["rounded", "square"],
    },
    pro: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Icons", iconSchema);
