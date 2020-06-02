const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkoutSchema = new Schema(
  {
    idclient: {
      type: String,
      required: true,
      unique: false,
    },
    products: {
      type: Array,
      required: true,
      unique: false,
      default: [],
    },
    // Info

    name: {
      type: String,
      required: true,
      unique: false,
    },
    adress: {
      type: String,
      required: true,
      unique: false,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: false,
    },
    zipcode: {
      type: String,
      required: true,
      unique: false,
    },
    payment: {
      type: String,
      required: true,
      unique: false,
    },
    status: {
      type:String,
      required: false,
      unique: false,
      default: "in preparation",
    }
  },
  {
    timestamps: true,
  }
);

const CheckOut = mongoose.model("CheckOut", checkoutSchema);
module.exports = CheckOut;
