const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "itemModel",
        },
        name: String,
        image: String,
        description: String,
        price: Number,
        qty: Number,
      },
    ],
    discount: {
      type: Number,
    },
    cartTotalQty: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    paymentType: {
      type: String,
    },
    address: {
      _id: String,
      name: String,
      address: String,
    },
    comment: {
      type: String,
    },
    // setting the 4 types of status and default is going to be received
    status: {
      type: String,
      enum: ["received", "prepared", "out_for_delivery", "completed"],
      default: "received",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orderModel", orderSchema);
module.exports = orderModel;
