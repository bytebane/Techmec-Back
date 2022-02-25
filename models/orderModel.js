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
      min: 100,
    },
    orderStatus: {
      type: String,
      default: "placed",
    },
    orderPayment: {
      type: String,
      default: "unpaid",
    },
    returnStatus: {
      type: String,
      default: "NA",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
