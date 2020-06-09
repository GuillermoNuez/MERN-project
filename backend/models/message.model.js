const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    idchat: {
      type: String,
      required: true,
      unique: false,
    },
    iduser: {
      type: String,
      required: true,
      unique: false,
    },
    message: {
      type: String,
      required: true,
      unique: false,
    },
    read : {
      type: Boolean,
      required: false,
      unique: false,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
