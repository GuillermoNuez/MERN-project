const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    iduser1: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    iduser2: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
