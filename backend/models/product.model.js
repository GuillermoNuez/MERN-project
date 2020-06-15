const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    userid: { type: String, required: true },

    product: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    season: { type: String, required: true },
    image1: { type: String, required: true },
    images: {
      type: Array,
      required: false,
      unique: false,
      default: [],
    },
    onsale: {
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
