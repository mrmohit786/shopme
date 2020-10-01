//IMPORT MONGOOSE
const mongoose = require("mongoose");

//CREATE CATEGORY SCHEMA
const categoryScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//EXPORT
module.exports = mongoose.model("Category", categoryScheme);
