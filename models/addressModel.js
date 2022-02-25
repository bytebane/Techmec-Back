const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      // required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
