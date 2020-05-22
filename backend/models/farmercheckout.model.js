const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const farmercheckoutSchema = new Schema(
  {

    idfarmer: {
      type: String,
      required: true,
      unique: false,
    },

    idproduct: {
      type: String,
      required: true,
      unique: false,
    },

    idpedido: {
      type: String,
      required: true,
      unique: false,
    },

    amount: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const FarmerCheckOut = mongoose.model("FarmerCheckOut", farmercheckoutSchema);
module.exports = FarmerCheckOut;
