const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },

    bio: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    photo: {
      type: String,
      required: false,
      unique: false,
      default: "default.png",
    },
    photos: {
      type: Array,
      required: false,
      unique: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
