//IMPORT MONGOOSE
const mongoose = require("mongoose");

//CRATE OBJECT ID FOR ROLES
const { ObjectId } = mongoose.Schema;

//PRODUCTCARTSCHEMA
const ProductCartScheme = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
const ProductCart = mongoose.model("ProductCart", ProductCartScheme);

//ORDERSCHEMA
const orderScheme = mongoose.Schema(
  {
    products: [ProductCartScheme],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderScheme);

//EXPORT SCHEMA
module.exports = { Order, ProductCart };
