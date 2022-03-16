const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    prodNames: [
      {
        type: String,
      },
    ],
    prodPrices: [
      {
        type: String,
      },
    ],
    quantities: [
      {
        type: Number,
        default: 1,
        min: 1,
        max: 10,
      },
    ],
    colors: [
      {
        type: String,
        lowercase: true,
      },
    ],
    orderPrice: {
      type: String,
      // min: 100,
    },
    orderStatus: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
    orderPayment: {
      type: String,
      default: "unpaid",
    },
    orderAddress: {
      type: String,
      // default: "NA",
    },
    returnStatus: {
      type: String,
      default: "NA",
    },
    razorPayPaymentId: {
      type: String,
      default: "NA",
    },
    razorPayOrderID: {
      type: String,
      default: "NA",
    },
    deliveredOn: {
      type: String,
      default: "NA",
    },
    estDelDate: {
      type: String,
      // default: "NA",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
