const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shoppingcartSchema = new Schema(
   {
     userid: { type: String, required: true },
     productid: { type: String, required: true },
     amount: { type: Number, default: 1 },
   },
   {
     timestamps: true,
   }
 );

const ShoppingCart = mongoose.model("ShoppingCart", shoppingcartSchema);

module.exports = ShoppingCart;