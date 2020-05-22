const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  ratingowner: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  iduser: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    unique: false,
  },
  score: {
    type: Number,
    required: true,
    unique: false,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
