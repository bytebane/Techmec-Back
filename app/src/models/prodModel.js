const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      // lowercase: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    mrPrice: {
      type: String,
      default: "0.00",
    },
    sPrice: {
      type: String,
      default: "0.00",
    },
    colors: [
      {
        type: String,
        default: ["black"],
      },
    ],
  },
  { timestamps: true } //to include createdAt and updatedAt
);

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
