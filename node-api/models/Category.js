const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  Name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  Description: {
    type: String,
    maxLength: 500,
  },
  Active: {
    type: Boolean,
    default: true,
  },
  IsDelete: {
    type: Boolean,
    default: false,
  },
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
