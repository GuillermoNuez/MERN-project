const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recoverSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
      expires: '300s'
    },
  },
  {
    timestamps: false,
  }
);

const Recover = mongoose.model("Recover", recoverSchema);

module.exports = Recover;
