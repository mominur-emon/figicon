const mongoose = require("mongoose");

const iconSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  iconLink: {
    type: String,
    required: true,
  },

 price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  
  secondaryCategory: {
    type: String,
  },

  subCategory: {
    type: String,
    required: true,
    enum:["line","solid"],
  },
  shape: {
    type: String,
    required: true,
    enum:["rounded","square"],
  },
  downloaded: {
    type: Number,
    default:0,
  },

 
},{timestamps:true});

module.exports = mongoose.model("Icons", iconSchema);